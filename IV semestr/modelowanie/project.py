import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from scipy.integrate import solve_ivp

N_MAS = 5
MASS = 1.0
K_SPRING = 10.0
C_DAMPING = 0.1
L0_SPRING = 1.0

X_ANCHOR_LEFT = 0.0
X_ANCHOR_RIGHT = X_ANCHOR_LEFT + (N_MAS + 1) * L0_SPRING

def system_derivatives(t, y, n_masses, mass, k, c, l0, x_anchor_left, x_anchor_right):
    positions = y[:n_masses]
    velocities = y[n_masses:]

    dxdt = velocities
    dvdt = np.zeros(n_masses)

    for i in range(n_masses):
        x_current = positions[i]
        v_current = velocities[i]

        if i == 0:
            x_left_neighbor = x_anchor_left
        else:
            x_left_neighbor = positions[i-1]
        force_left_spring = -k * ((x_current - x_left_neighbor) - l0)

        if i == n_masses - 1:
            x_right_neighbor = x_anchor_right
        else:
            x_right_neighbor = positions[i+1]
        force_right_spring = k * ((x_right_neighbor - x_current) - l0)
        
        force_damping = -c * v_current
        
        total_force = force_left_spring + force_right_spring + force_damping
        dvdt[i] = total_force / mass
        
    return np.concatenate((dxdt, dvdt))

initial_positions = np.array([X_ANCHOR_LEFT + (i + 1) * L0_SPRING for i in range(N_MAS)])

if N_MAS > 0:
    initial_positions[0] -= 0.5 * L0_SPRING

initial_velocities = np.zeros(N_MAS)
y0 = np.concatenate((initial_positions, initial_velocities))

T_START = 0.0
T_END = 20.0
N_FRAMES = 200
t_eval = np.linspace(T_START, T_END, N_FRAMES)

print("Rozwiązywanie układu ODE...")
solution = solve_ivp(
    system_derivatives,
    (T_START, T_END),
    y0,
    args=(N_MAS, MASS, K_SPRING, C_DAMPING, L0_SPRING, X_ANCHOR_LEFT, X_ANCHOR_RIGHT),
    dense_output=True,
    t_eval=t_eval,
    method='RK45'
)
print("Rozwiązanie zakończone.")

sol_positions = solution.y[:N_MAS, :]
sol_velocities = solution.y[N_MAS:, :]

def calculate_energy(positions_hist, velocities_hist, mass, k, l0, x_anchor_left, x_anchor_right):
    num_steps = positions_hist.shape[1]
    kinetic_energy = np.zeros(num_steps)
    potential_energy = np.zeros(num_steps)

    for step in range(num_steps):
        current_pos = positions_hist[:, step]
        current_vel = velocities_hist[:, step]

        kinetic_energy[step] = 0.5 * mass * np.sum(current_vel**2)

        pe_step = 0.0
        pe_step += 0.5 * k * ((current_pos[0] - x_anchor_left) - l0)**2
        
        for i in range(N_MAS - 1):
            pe_step += 0.5 * k * ((current_pos[i+1] - current_pos[i]) - l0)**2
            
        pe_step += 0.5 * k * ((x_anchor_right - current_pos[N_MAS-1]) - l0)**2
        potential_energy[step] = pe_step
        
    total_energy = kinetic_energy + potential_energy
    return kinetic_energy, potential_energy, total_energy

kinetic_E, potential_E, total_E = calculate_energy(
    sol_positions, sol_velocities, MASS, K_SPRING, L0_SPRING, X_ANCHOR_LEFT, X_ANCHOR_RIGHT
)

fig, (ax_anim, ax_energy) = plt.subplots(2, 1, figsize=(10, 8), gridspec_kw={'height_ratios': [2, 1]})

ax_anim.set_xlim(X_ANCHOR_LEFT - L0_SPRING, X_ANCHOR_RIGHT + L0_SPRING)
ax_anim.set_ylim(-1, 1)
ax_anim.set_xlabel("Położenie [m]")
ax_anim.set_yticks([])
ax_anim.set_title(f"Układ {N_MAS} mas połączonych sprężynami")

mass_points, = ax_anim.plot([], [], 'bo', ms=10)
spring_lines = [ax_anim.plot([], [], 'r-')[0] for _ in range(N_MAS + 1)]
anchor_points, = ax_anim.plot([X_ANCHOR_LEFT, X_ANCHOR_RIGHT], [0, 0], 'ks', ms=8)
time_text = ax_anim.text(0.02, 0.90, '', transform=ax_anim.transAxes)

ax_energy.set_xlabel("Czas [s]")
ax_energy.set_ylabel("Energia [J]")
ax_energy.grid(True)
line_ke, = ax_energy.plot([], [], lw=2, label='Energia Kinetyczna')
line_pe, = ax_energy.plot([], [], lw=2, label='Energia Potencjalna')
line_te, = ax_energy.plot([], [], lw=2, label='Energia Całkowita')
ax_energy.legend(loc='upper right')
ax_energy.set_xlim(T_START, T_END)

max_energy_val = np.max(total_E) if len(total_E) > 0 else 1.0
min_energy_val = np.min(total_E) if len(total_E) > 0 else 0.0
ax_energy.set_ylim(min(0, min_energy_val - 0.1*abs(min_energy_val)), max_energy_val + 0.1*max_energy_val)

def init_animation():
    mass_points.set_data([], [])
    for line in spring_lines:
        line.set_data([], [])
    time_text.set_text('')
    
    line_ke.set_data([], [])
    line_pe.set_data([], [])
    line_te.set_data([], [])
    return mass_points, *spring_lines, anchor_points, time_text, line_ke, line_pe, line_te

def animate(i):
    current_positions = sol_positions[:, i]
    mass_points.set_data(current_positions, np.zeros(N_MAS))

    spring_lines[0].set_data([X_ANCHOR_LEFT, current_positions[0]], [0, 0])
    for j in range(N_MAS - 1):
        spring_lines[j+1].set_data([current_positions[j], current_positions[j+1]], [0, 0])
    spring_lines[N_MAS].set_data([current_positions[N_MAS-1], X_ANCHOR_RIGHT], [0, 0])
    
    time_text.set_text(f'Czas = {t_eval[i]:.2f} s')

    line_ke.set_data(t_eval[:i+1], kinetic_E[:i+1])
    line_pe.set_data(t_eval[:i+1], potential_E[:i+1])
    line_te.set_data(t_eval[:i+1], total_E[:i+1])
    
    return mass_points, *spring_lines, anchor_points, time_text, line_ke, line_pe, line_te

ani = FuncAnimation(fig, animate, frames=N_FRAMES,
                    init_func=init_animation, blit=True, interval=max(1, int(1000 * (T_END-T_START)/N_FRAMES)))

plt.tight_layout(pad=2.0)
plt.show()

print(f"Parametry symulacji:")
print(f"  Liczba mas: {N_MAS}")
print(f"  Masa jednostkowa: {MASS} kg")
print(f"  Stała sprężystości: {K_SPRING} N/m")
print(f"  Tłumienie: {C_DAMPING} Ns/m")
print(f"  Długość spoczynkowa sprężyny: {L0_SPRING} m")
print(f"  Zakotwiczenie lewe: {X_ANCHOR_LEFT} m, prawe: {X_ANCHOR_RIGHT} m")