from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.screenmanager import ScreenManager, Screen

class MenuScreen(Screen):
    def __init__(self, **kwargs):
        super(MenuScreen, self).__init__(**kwargs)
        layout = BoxLayout(orientation='vertical')
        label = Label(text='Dziennik Ocen', font_size=32)
        button = Button(text='Python', size_hint=(1, 0.2))
        button.bind(on_press=self.go_to_subject)
        layout.add_widget(label)
        layout.add_widget(button)
        self.add_widget(layout)

    def go_to_subject(self, instance):
        self.manager.current = 'subject'

class SubjectScreen(Screen):
    def __init__(self, **kwargs):
        super(SubjectScreen, self).__init__(**kwargs)
        layout = BoxLayout(orientation='vertical')
        label = Label(text='Python', font_size=32)
        
        grades = [5, 4, 3]
        absences = 2
        
        if 2 in grades:
            grades_color = (1, 0, 0, 1)  # czerwony
        else:
            grades_color = (0, 1, 0, 1)  # zielony
        
        if absences > 1:
            absences_color = (1, 0, 0, 1)  # czerwony
        elif absences == 1:
            absences_color = (1, 1, 0, 1)  # żółty
        else:
            absences_color = (1, 1, 1, 1)  # biały
        
        grades_label = Label(text=f'Oceny: {", ".join(map(str, grades))}', size_hint=(1, 0.2), color=grades_color)
        absences_label = Label(text=f'Nieobecności: {absences}', size_hint=(1, 0.2), color=absences_color)
        
        back_button = Button(text='Powrót', size_hint=(1, 0.2))
        back_button.bind(on_press=self.go_back)
        
        layout.add_widget(label)
        layout.add_widget(grades_label)
        layout.add_widget(absences_label)
        layout.add_widget(back_button)
        self.add_widget(layout)

    def go_back(self, instance):
        self.manager.current = 'menu'

class DziennikApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(MenuScreen(name='menu'))
        sm.add_widget(SubjectScreen(name='subject'))
        return sm

app = DziennikApp()
app.run()
