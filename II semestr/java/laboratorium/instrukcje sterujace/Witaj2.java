package powitanie;

class Witaj { String powitanie="Witaj";
    public static void main(String[] args) {
        Witaj mojePowitanie = new Witaj();
        mojePowitanie.powitaj();
    }
    private void powitaj() { System.out.println(powitanie); }
}
