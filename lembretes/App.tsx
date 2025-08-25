import {
  useState
} from 'react'
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
}
  from 'react-native'
import { AntDesign } from '@expo/vector-icons'

interface Lembrete {
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
    setLembretes(lembretesAtuais => [novoLembrete, ...lembretesAtuais])
    setLembrete('')
  }
  const remover = (lembrete: Lembrete) => {
    console.log('chamou a remover...')
    setLembretes(
      lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id)
    )
    // Alert.alert(
    //   // título
    //   'Remover lembrete',
    //   `Deseja remover esse lembrete? ${lembrete.texto}`,
    //   [
    //     {
    //       text: 'Cancelar',
    //       style: 'cancel'
    //     },
    //     {
    //       text: 'Remover',
    //       style: 'destructive',
    //       onPress: () => {
    //         setLembretes(
    //           lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id)
    //         )
    //       }
    //     }
    //   ]
    // )

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
        onPress={adicionar}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Salvar lembrete
        </Text>
      </Pressable>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id}
        data={lembretes}
        renderItem={(lembrete => (
          <View
            style={styles.listItem}>
            <Text
              style={styles.listItemText}>
              {lembrete.item.texto}
            </Text>
            <View
              style={styles.listItemButtons}>
              <Pressable
                onPress={() => remover(lembrete.item)}>
                <AntDesign
                  name="delete"
                  size={24} />
              </Pressable>
              <Pressable>
                <AntDesign
                  name="edit"
                  size={24}
                />
              </Pressable>
            </View>
          </View>
        ))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
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
  },
  list: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginTop: 12,
    borderRadius: 4,
    padding: 8
  },
  listItem: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemText: {
    textAlign: 'center',
    width: '70%',
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%'
  }
});
