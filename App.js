import React, { useEffect,useState } from 'react';
import { View, Text,FlatList,StyleSheet,SafeAreaView,StatusBar,Linking,ActivityIndicator } from 'react-native';
 import {  Card, Button, Icon } from '@rneui/themed';
 
 const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [news,setNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://api.collectapi.com/news/getNews?country=tr&tag=general", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.result[0])
        setNews(data.result)
        setIsLoading(false);

      })
      .catch(error => {
        console.error(error);
      });
  };
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(78, 116, 289, 1)' }}>
       
       <Text style={{color:'white',fontSize:20,marginBottom:10}}>En Ekspress Haber</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
       <StatusBar/>
       <Button  buttonStyle={{
                backgroundColor: 'rgba(78, 116, 289, 1)',
               }}>
  En Ekspress Haber
  <Icon style={{marginLeft:4}} name="circle" color="white" />
</Button>
        <FlatList 
      style={styles.container}
      data={news}
      renderItem={({item})=> <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ padding: 0 }}
        source={{
          uri:
            item.image,
        }}
      />
      <Text style={{ marginBottom: 10 }}>
       {item.description}
      </Text>
      <Text style={{ marginBottom: 10,fontStyle:'italic',fontWeight:100 }}> {item.date.substring(0,10)}</Text>

      <Text style={{ marginBottom: 10,fontStyle:'italic',fontWeight:100 }}>Kaynak: {item.source}</Text>
      <Button
      onPress={()=>Linking.openURL(item.url)}
        icon={
          <Icon
            name="link"
            color="#ffffff"
            iconStyle={{ marginRight: 10 }}
          />
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Detaylar..."
      />
    </Card>}
      keyExtractor={(item)=>item.key}
      />

      
 
     </>
  );
};
const styles = StyleSheet.create({
  container:{
    backgroundColor:'wheat'
  },
  row:{
    padding:15,
    marginBottom:5,
    backgroundColor:'skyblue'
  }
})
export default App;
