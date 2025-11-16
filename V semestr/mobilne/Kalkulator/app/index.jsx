import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
// KROK 1: Importujemy NOWĄ, działającą bibliotekę
import { Parser } from 'expr-eval';

// Tworzymy instancję parsera raz, dla wydajności
const parser = new Parser();
// POPRAWKA: Ręcznie definiujemy stałe 'pi' oraz 'e',
// aby mieć pewność, że parser je rozpozna.
parser.consts.pi = Math.PI;
parser.consts.e = Math.E;


const Button = ({ onPress, text, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [expression, setExpression] = React.useState('0');
  const [isRad, setIsRad] = React.useState(true); // expr-eval domyślnie używa radianów

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleTap = (type, value) => {

    setExpression(prevExpression => {

      let currentExpr = prevExpression;

      if (currentExpr === 'Error') {
        if (type === 'clear') {
          return '0';
        }
        if (type === 'number' || type === 'parenthesis' || type === 'unary') {
          currentExpr = '0';
        } else {
          return 'Error';
        }
      }

      switch (type) {
        case 'number':
          return currentExpr === '0' ? String(value) : currentExpr + value;

        case 'parenthesis':
          return currentExpr === '0' ? value : currentExpr + value;

        case 'operator':
          let op = value;
          if (value === '÷') op = '/';
          if (value === '×') op = '*';
          if (value === 'xʸ') op = '^'; // Ta biblioteka również używa '^'

          const lastChar = currentExpr.slice(-1);
          const operators = ['+', '-', '*', '/', '^'];

          if (operators.includes(lastChar)) {
            return currentExpr.slice(0, -1) + op;
          } else {
            return currentExpr + op;
          }

        case 'equals':
          try {
            let exprToEval = currentExpr;
            const lastCharEquals = currentExpr.slice(-1);
            const operatorsEquals = ['+', '-', '*', '/', '^'];

            if (operatorsEquals.includes(lastCharEquals)) {
              exprToEval = currentExpr.slice(0, -1);
            }

            if (exprToEval === "") {
              return "0";
            }

            // Ta biblioteka jest bardziej zaawansowana, ale domyślnie używa radianów.
            // Konwersja deg->rad nie jest potrzebna, jeśli użytkownik wpisze np. sin(90)
            // w trybie DEG, biblioteka ma funkcje `sin(deg 90)`
            // Dla uproszczenia, zostawiamy domyślne radiany dla sin/cos/tan
            // `isRad` będzie na razie tylko kosmetyczne.

            // KROK 2: Używamy nowej biblioteki
            const result = parser.evaluate(exprToEval);
            return String(result);
          } catch (e) {
            console.error(e);
            return 'Error';
          }

        case 'clear':
          return '0';

        case 'posneg':
          // Lepsza obsługa plus/minus
          if (currentExpr.startsWith('-')) {
            return currentExpr.substring(1);
          } else if (currentExpr !== '0') {
            return '-' + currentExpr;
          }
          return currentExpr;

        case 'percentage':
          // Ta biblioteka nie wspiera '%'
          // Zamiast tego, obliczamy to sami
          try {
            const result = parser.evaluate(currentExpr + '/100');
            return String(result);
          } catch (e) {
            return 'Error';
          }

        case 'decimal':
          return currentExpr + '.';

        case 'rad_deg':
          setIsRad(!isRad);
          return currentExpr;

        case 'unary':
          let func = value;
          let base = (currentExpr === '0') ? '' : currentExpr;

          switch (value) {
            case 'x²': func = '^2'; return base + func;
            case 'x³': func = '^3'; return base + func;
            case '¹/x': func = '1/'; return currentExpr === '0' ? func : currentExpr + func;
            case '²√x': func = 'sqrt('; return base + func;
            case '³√x': func = 'cbrt('; return base + func;
            case 'x!': func = '!'; return base + func;
            case 'ln': func = 'ln('; return base + func;

            // KROK 3: Poprawka błędu log10
            case 'log₁₀': func = 'log10('; return base + func;

            case 'eˣ': func = 'exp('; return base + func;
            case '10ˣ': func = '10^('; return base + func;
            case 'e': func = 'e'; return base + func;
            case 'π': func = 'pi'; return base + func; // Ta biblioteka woli 'pi' (małą literą)
            case 'Rand': func = String(Math.random()); return base + func;

            default:
              func = value + '(';
              return base + func;
          }

        default:
          return currentExpr;
      }
    });
  };

  const portraitButtons = [
    [
      { type: 'clear', value: 'AC', style: styles.darkGrayButton },
      { type: 'ignore', value: '', style: { ...styles.darkGrayButton, flex: 2 } },
      { type: 'operator', value: '÷', style: styles.orangeButton },
    ],
    [
      { type: 'number', value: '7', style: styles.darkGrayButton },
      { type: 'number', value: '8', style: styles.darkGrayButton },
      { type: 'number', value: '9', style: styles.darkGrayButton },
      { type: 'operator', value: '×', style: styles.orangeButton },
    ],
    [
      { type: 'number', value: '4', style: styles.darkGrayButton },
      { type: 'number', value: '5', style: styles.darkGrayButton },
      { type: 'number', value: '6', style: styles.darkGrayButton },
      { type: 'operator', value: '-', style: styles.orangeButton },
    ],
    [
      { type: 'number', value: '1', style: styles.darkGrayButton },
      { type: 'number', value: '2', style: styles.darkGrayButton },
      { type: 'number', value: '3', style: styles.darkGrayButton },
      { type: 'operator', value: '+', style: styles.orangeButton },
    ],
    [
      { type: 'number', value: '0', style: {...styles.darkGrayButton, ...styles.zeroButton} },
      { type: 'decimal', value: '.', style: styles.darkGrayButton },
      { type: 'equals', value: '=', style: styles.orangeButton },
    ],
  ];

  const landscapeButtons = [
    [
        { type: 'parenthesis', value: '(' }, { type: 'parenthesis', value: ')' },
        { type: 'ignore', value: 'mc' }, { type: 'ignore', value: 'm+' },
        { type: 'ignore', value: 'm-' }, { type: 'ignore', value: 'mr' }, { type: 'clear', value: 'AC', style: styles.grayButton, textStyle: styles.blackText },
        { type: 'posneg', value: '±', style: styles.grayButton, textStyle: styles.blackText }, { type: 'percentage', value: '%', style: styles.grayButton, textStyle: styles.blackText },
        { type: 'operator', value: '÷', style: styles.orangeButton }
    ],
    [
        { type: 'ignore', value: '2nd' }, { type: 'unary', value: 'x²' }, { type: 'unary', value: 'x³' }, { type: 'operator', value: 'xʸ' },
        { type: 'unary', value: 'eˣ' }, { type: 'unary', value: '10ˣ' }, { type: 'number', value: '7' }, { type: 'number', value: '8' },
        { type: 'number', value: '9' }, { type: 'operator', value: '×', style: styles.orangeButton }
    ],
    [
        { type: 'unary', value: '¹/x' }, { type: 'unary', value: '²√x' }, { type: 'unary', value: '³√x' }, { type: 'ignore', value: 'ʸ√x' },
        { type: 'unary', value: 'ln' }, { type: 'unary', value: 'log₁₀' }, { type: 'number', value: '4' }, { type: 'number', value: '5' },
        { type: 'number', value: '6' }, { type: 'operator', value: '-', style: styles.orangeButton }
    ],
    [
        { type: 'unary', value: 'x!' }, { type: 'unary', value: 'sin' }, { type: 'unary', value: 'cos' }, { type: 'unary', value: 'tan' },
        { type: 'unary', value: 'e' }, { type: 'ignore', value: 'EE' }, { type: 'number', value: '1' }, { type: 'number', value: '2' },
        { type: 'number', value: '3' }, { type: 'operator', value: '+', style: styles.orangeButton }
    ],
    [
        { type: 'rad_deg', value: isRad ? 'Rad' : 'Deg' }, { type: 'unary', value: 'sinh' }, { type: 'unary', value: 'cosh' },
        { type: 'unary', value: 'tanh' }, { type: 'unary', value: 'π' }, { type: 'unary', value: 'Rand' },
        { type: 'number', value: '0', style: { flex: 2 } },
        { type: 'decimal', value: '.' }, // Usunięto styl orangeButton
        { type: 'equals', value: '=', style: styles.orangeButton } // DODANO BRAKUJĄCY PRZYCISK
    ]
  ];

  const renderKeypad = (buttonsLayout) => (
    <View style={styles.keypadContainer}>
      {buttonsLayout.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((button, buttonIndex) => (
            <Button
              key={`${button.value}-${buttonIndex}`}
              onPress={() => handleTap(button.type, button.value)}
              text={button.value}
              style={[
                isLandscape && styles.landscapeButton,
                button.style
                // USUNIĘTO BŁĘDNY STYL STĄD
              ]}
              textStyle={[
                isLandscape && styles.landscapeButtonText,
                button.textStyle
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Kalkulator</Text>
        <Text style={styles.splashAuthor}>Kacper Szczudło</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text
          style={[
            styles.displayText,
            expression.length > 10 ? styles.displayTextSmall : null
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {expression}
        </Text>
      </View>
      {isLandscape ? renderKeypad(landscapeButtons) : renderKeypad(portraitButtons)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  splashText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  splashAuthor: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#202020',
  },
  displayText: {
    color: 'white',
    fontSize: 70,
    fontWeight: '300',
    textAlign: 'right',
  },
  displayTextSmall: {
    fontSize: 50,
  },
  keypadContainer: {
    flex: 2,
    paddingHorizontal: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
  },
  landscapeButton: {
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#505050'
  },
  landscapeButtonText: {
    fontSize: 18,
  },
  orangeButton: {
    backgroundColor: '#ff9a00',
  },
  grayButton: {
    backgroundColor: '#a5a5a1',
  },
  darkGrayButton: {
    backgroundColor: '#555555',
  },
  zeroButton: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 35,
  },
  blackText: {
    color: 'black',
  },
});