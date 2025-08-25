import { 
  Button,
  Pressable,
  StyleSheet,
  Text, 
  TextInput, 
  View } 
from 'react-native'
import {
  useState
} from 'react'

interface Lembrete{
  id: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState('')
  const [lembretes, setLembretes] = useState<Lembrete[]>([])
//   - construir um objeto Lembrete com id igual à data atual do sistema e texto  igual ao valor
// existente na variável de estado chamada lembrete
// - utilizar o hook associado à lista de lembretes a fim de adicionar o lembrete à lista,
// garantindo a atualização da tela
// - atualizar a variável lembrete armazenando a cadeia vazia, limpando portando o campo em
// que o usuário digita seus lembretes
  const adicionar = () => {
    const novoLembrete: Lembrete = {
      id: Date.now().toString(),
      texto: lembrete
    }
    setLembretes(lembretesAtuais => [novoLembrete,...lembretesAtuais])
    setLembrete('')  
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='Digite um lembrete...'
        onChangeText={setLembrete}
        value={lembrete}
      />
      <Pressable
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Salvar lembrete
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    textAlign: 'center',
    borderRadius: 4,
    paddingVertical: 8
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});
