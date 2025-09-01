import {Button, StyleSheet, Text, View } from 'react-native';
import useContador from './hooks/useContador';
export default function App() {
  const {
    contador, incrementar, decrementar, reiniciar
  } = useContador(0)
  return (
    <View style={styles.container}>
      <Text>Nosso primeiro custom hook</Text>
      <View style={{width: '80%', borderWidth: 1, padding: 12, borderColor: '#DDD', borderRadius: 8}}>
        <Text
          style={{fontSize: 48, textAlign: 'center', padding: 4}}
        >{contador}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button 
            title='Incrementar'
            onPress={incrementar}/>
          <Button 
            title='Decrementar'
            onPress={decrementar}/>
          <Button 
            title='Reiniciar'
            onPress={reiniciar}
          />
        </View>
      </View>
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
});
