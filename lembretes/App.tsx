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
  id?: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState<Lembrete>({texto: ''})
  const [lembretes, setLembretes] = useState<Lembrete[]>([])
  const [emModoDeEdicao, setEmModoDeEdicao] = useState(false)
  
  const adicionar = () => {
    const novoLembrete: Lembrete = {
      id: Date.now().toString(),
      texto: lembrete.texto
    }
    setLembretes(lembretesAtuais => [novoLembrete, ...lembretesAtuais])
    setLembrete({texto: ''})
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

  const atualizar = () => {
    //usar mecanismos js ou ts para atualizar apenas o lembrete envolvido no momento, gerando uma lista nova
    const lembretesAtualizados = lembretes.map((item => {
      if(item.id === lembrete.id)
        return lembrete
      return item
    }))
    //atualizar a variável de estado depois disso, usando a lista nova
    setLembretes(lembretesAtualizados)
    //colocar a aplicaçaõ em modo de adição
    setEmModoDeEdicao(false)
    //limpa o campo em que o usuário digitou
    setLembrete({texto: ''})
  }
  return (
    <View style={styles.container}>
      <Text>{`id: ${lembrete.id}, texto: ${lembrete.texto}`}</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite um lembrete...'
        onChangeText={(novoTexto) => setLembrete({id: lembrete.id, texto: novoTexto})}
        value={lembrete.texto}
      />
      <Pressable
        onPress={emModoDeEdicao ? atualizar: adicionar}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          {`${emModoDeEdicao ? 'Atualizar' : 'Adicionar'} lembrete`}
        </Text>
      </Pressable>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id!}
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
              <Pressable
                onPress={() => {
                  setLembrete({id: lembrete.item.id, texto: lembrete.item.texto})
                  setEmModoDeEdicao(true)
                }}>
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
