import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { CheckBox,Overlay } from 'react-native-elements'
import React,{ useEffect, useRef, useState } from 'react'
import axios from 'axios';

import deleteImg from '../../../assets/delete.png'
import reqError from '../../../assets/404.png'

export default function TodoApp() {
    const config = { headers: { "Content-type": "application/json",} };

    const [inputChange, setInputChange]=useState('');
    const [dataAPI, setDataAPI]=useState([])
    const [notRespond, setNotRespond]= useState(false);

    const todoInput=useRef();

    const handleEvent = indeks => {
        console.log(indeks);
    }

    //delet data
    const handleDelete = id =>{
        axios.delete(`http://localhost:5000/todo/${id}`)
        .then(res=> {
            console.log(res);
            getData();
        }).catch(err=> console.log(err))
    }

    //change data
    const handleUpdateStatus = (id, check) =>{

        let updateStatus={status: "complete"}
        
        const body = JSON.stringify(updateStatus);

        axios.patch(`http://localhost:5000/todo/${id}`, body, config)
        .then(res=> {
            console.log(res)
            getData();
        }).catch(err=> console.log(err))
    }

    const handleUpdateTodo = (value, id) => {
        
        const dataToSend={ todoName: value }
        const body = JSON.stringify(dataToSend);

        axios.patch(`http://localhost:5000/todo/${id}`, body, config)
        .then(res=> {
            console.log(res)
            getData();
        }).catch(err=> console.log(err))
    }
    
    //add data
    const handleChange = e => setInputChange(e.target.value);
    const handleAddData = () => {

        const value={todoName: inputChange, status: "process"}
        const body = JSON.stringify(value);

        axios.post("http://localhost:5000/todo", body, config)
        .then(res=> {
            todoInput.current.clear();
            setInputChange('');
            getData();
        }).catch(err=> console.log(err))
    }

    const getData = () => {
        axios.get("http://localhost:5000/todo")
        .then(res=> setDataAPI(res.data.result))
        .catch(err=> {
            setNotRespond(true)
            console.log(err)
        })
    }
    useEffect(()=> getData(),[]);

  return (
    <View style={[styles.container,{flex: 1}]}>
        <ScrollView>
            {notRespond ? 
                <View style={styles.cntNotRespons}>
                    <Text style={styles.txtNotRespons}>oooops something wrong please back later</Text>
                    <Image source={reqError} style={styles.notRespons} />
                </View>
                
                :
                <View>
                    <TextInput
                        ref={todoInput}
                        placeholder="Write a note .."
                        style={styles.textInputLabel}
                        multiline={true}
                        onChange={e=>handleChange(e)}
                    />
                    <View style={styles.dataCnt}>
                        { dataAPI.map( data => <RenderData 

                            data={data}
                            key={data.id}
                            handleEvent={(id)=>handleEvent(id)}
                            handleDelete={ (id)=>handleDelete(id) }
                            handleUpdateStatus={ (id,check)=> handleUpdateStatus(id,check) }
                            handleUpdateTodo= { (dataToUpdate, id )=>handleUpdateTodo(dataToUpdate,id) }

                        /> ) }
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <TouchableOpacity onPress={handleAddData} style={styles.addBtn}>
                            <Text style={styles.textAddBtn}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </ScrollView>
    </View>
  )
}

function RenderData( props ){

    const { data, handleEvent, handleUpdateStatus,handleDelete, handleUpdateTodo }= props;

    const [check, setCheck] = useState(false);

    const [color, setColor] = useState({bgCnt: 'White', txt: '#362422'});
    const [toggle, setToggle]=useState(true)

    const [dataUpdate, setDataUpdate]=useState(data.todoName)
    const handleChangeDataUpdate = e => setDataUpdate(e.target.value)

    let { todoName }=data;
    if(todoName!=null){
        todoName.length>29 ? todoName=todoName.slice(0,29)+'...' : todoName;
    }

    const handleClick = () => {
        toggle ? setColor({bgCnt:'#ffebd4',txt:'#c97816'  }) : setColor({bgCnt: 'White', txt: '#362422'});
        handleEvent(data.id);
        setToggle(prev=> !prev);
    }

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
        !visible ? setColor({bgCnt:'#ffebd4',txt:'#c97816'  }) : setColor({bgCnt: 'White', txt: '#362422'});
    };
    useEffect(()=>data.status=='complete' ? setCheck(true) : setCheck(false),[]);   

    return(
        <View style={[styles.listCnt, {backgroundColor: color.bgCnt}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                    center
                    checked={check}
                    onPress={() =>{ setCheck(true); handleUpdateStatus(data.id,true) } }
                    checkedColor={"#7804db"}
                />
                <Text onPress={()=> { handleClick(); toggleOverlay()  } }  style={styles.textRadio }>{todoName}</Text>
            </View>

            <TouchableOpacity onPress={()=>handleDelete(data.id)}>
                <Image style={styles.delImg} source={deleteImg}/>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <TextInput
                    placeholder={dataUpdate}
                    style={styles.textInputLabel}
                    multiline={true}
                    onChange={e => handleChangeDataUpdate(e)}
                />
                <TouchableOpacity style={styles.delBtn} onPress={()=>{ handleUpdateTodo(dataUpdate, data.id); toggleOverlay(); }}>
                    <Text style={styles.textDelBtn}>Update</Text>
                </TouchableOpacity>
            </Overlay>

        </View>
)
}

const styles = StyleSheet.create({
    txtNotRespons: {
        color: "#c684ff",
        fontSize: '1.59rem',
        opacity: 0.59,
        textAlign: 'center',
        position: 'absolute',
        fontWeight: 800,
        zIndex: 10
    },  
    cntNotRespons: {
        position: 'relative'
    },
    notRespons: {
        width: Dimensions.get('window').width,
        height:  Dimensions.get('window').height-50,
        zIndex: 1
    },  
    textInputLabel:{
      color: '#1c1717',
      out: 'none',
      height: 190,
      backgroundColor: '#F9F5E9',
      borderStyle:'solid',
      borderColor: '#e890f0',
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 20,
      fontSize: '1rem',
      fontWeight: 850,
      outlineWidth: 0,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 8
    },
    dataCnt: {
        height: 356,
        overflow: 'scroll'
    },
    textRadio: {
        marginTop:-5.9,
        color: "gray",
        fontSize: "1.15rem",
        marginLeft: -20,
        fontWeight: 800
    }, 
    addLabel: {
        fontSize: 29,
        fontWeight:850
    },
    checkbox: {
        alignSelf: "center",
        height: 20,
        width: 20
    },  
    addBtn: {
        backgroundColor:"#c684ff",
        paddingVertical: 15.9,
        width: "100%",
        textAlign: 'center',
        color: '#5c4605',
        fontWeight: 850,
        borderRadius: 8,
    },
    delBtn: {
        backgroundColor:"#cee2f5",
        paddingVertical: 10,
        width: "49%",
        textAlign: 'center',
        color: '#5c4605',
        fontWeight: 850,
        borderRadius: 8,
    },
    textAddBtn: {
        color: "white",
        fontSize: "1.19rem",
        fontWeight: 850,
    },  
    textDelBtn: {
        color: "#389afc",
        fontSize: "1rem",
        fontWeight: 850,
    },  
    delImg: {
        height: 29,
        width: 29,
    },
    listCnt: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginVertical: 8,
        borderRadius:10
    },  
    container:{
        overflow: 'scroll'
    }
});