package com.company;

public class zeroDenominator extends Exception {
    public void zero() {
       try
       {
            throw new zeroDenominator();
       } catch (zeroDenominator zd) { System.out.println("Nie mozna dzielic przez zero"); }
   }

}
