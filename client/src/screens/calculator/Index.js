import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions,ScrollView } from 'react-native'

import ButtonOperation from './ButtonOperation'

export default function Calculator() {
  const[show, setShow]=useState('');//assign to input and show it

  const [result, setResult]=useState(0);//get result
  const [isCount, setIsCount]=useState(false);

  const [tree, setTree]=useState({
    left: 0,
    currentNumber: '',//get string then pass to number
    historyOp: '' //get last operator that cliked
  })
  const [stack, setStack]= useState([]);

  const getValue = val => {

    if(val=='.'){
      console.log(stack);
      return;
    }

    if(val=='='){
      let num=parseInt(tree.currentNumber);
      let getResult=0;
      if(tree.historyOp == '+'){ getResult=tree.left+num; }
      else if(tree.historyOp == '-'){ getResult=tree.left-num; }
      else if(tree.historyOp == '/'){ getResult=tree.left/num; }
      else if(tree.historyOp == '*'){ getResult=tree.left*num; }
      else if(tree.historyOp == '%'){ getResult=tree.left%num; }
      setResult(getResult);
      setShow(getResult);
      return setTree({left: getResult, currentNumber:'', historyOp: ''});
    }

    if(val=='+' || val=='-' || val=='/' || val=="*" || val=='%'){
      if(tree.left<=0){
        setTree({...tree, currentNumber:'', left: parseInt(tree.currentNumber,10), historyOp: val})
      } else if(tree.left>0){
        setTree({...tree, historyOp: val,currentNumber:'', left: result});
      }
    } else{
      let temp=tree.currentNumber;
      temp=temp+val;
      setTree({...tree, currentNumber: temp});
      if(temp !='' && tree.historyOp!=''){
        let num=parseInt(temp);
        let getResult=0;
        if(tree.historyOp == '+'){ getResult=tree.left+num; }
        else if(tree.historyOp == '-'){ getResult=tree.left-num; }
        else if(tree.historyOp == '/'){ getResult=tree.left/num; }
        else if(tree.historyOp == '*'){ getResult=tree.left*num; }
        else if(tree.historyOp == '%'){ getResult=tree.left%num; }
        setResult(getResult);
        setStack([...stack,getResult])
        setTree({...tree, currentNumber: temp});
      }
    }
    if(val=='<') {
      setShow(prev=> prev=prev.substring(0,prev.length-1))
    }
    if(val=='C'){
      setShow('');
      setTree({left:0, currentNumber:'', historyOp: ''})
      setResult(0);
      return;
    }
    // if(show.length>10){
    //   console.log(show)
    //   // let newStr=`${result} ${tree.historyOp} ${tree.currentNumber}`
    //   // setShow(newStr);
    // }
    setShow(prev=>prev+val);
  }

  return (
    <View style={[styles.container, {flex: 1}]}>
      <ScrollView>
        <View style={{marginBottom: 10}}>
          <Text style={styles.textHead}>Display</Text>
          <View style={styles.inputCnt}>         
            <TextInput
                value={show}  
                multiline={true}
                style={styles.textInputLabel}
            />
            <Text style={styles.resultText}>{result}</Text>
          </View>
        </View>
        <ButtonOperation getValue={(val)=>getValue(val)} />
      </ScrollView>
        {/* <View style={styles.buble}></View> */}
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ffa0a0',
    paddingHorizontal: 10
  },  
  buble: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    zIndex: 1,
    bottom: -50,
    right: 0,
    backgroundColor: 'rgba(198,132,255,0.49)',
    position: 'absolute'
  },
  inputCnt: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopColor: "rgba(255,255,255,0.45)",
    borderTopWidth: 2,
    borderLeftColor: "rgba(255,255,255,0.45)",
    borderLeftWidth: 2,
    borderStyle: 'solid',
    width: Dimensions.get('window').width - 22,
    borderRadius: 8,
    paddingHorizontal: 22,
    textAlign: 'right'
  },  
  textInputLabel:{
    color: 'white',
    out: 'none',
    height: 90,
    marginVertical: 40,
    fontSize: '2.9rem',
    textAlign: 'right',
    fontWeight: 850,
    outlineWidth: 0,
  },
  textHead:{
    color: 'white',
    fontSize: '1.2em',
    fontWeight: 850,
    marginBottom: 10
  },
  resultText: {
    fontSize: '2em',
    color: "rgba(255,255,255,0.49)",
    fontWeight: 850,
    paddingBottom: 10
  }
})