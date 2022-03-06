import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity
    ,Previe, Dimensions } from 'react-native'
import React from 'react'

export default function ButtonOperation( { getValue }) {

    const dummiechar=['1','2','-','+','3','4','/','*','5','6','%','=','7','8','9','0'];

    return (
    <View style={styles.superCnt}>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={ [styles.buttonCnt, styles.delBtn]}  onPress={()=>getValue('C')} >
                <Text style={ [ styles.buttonNumber, {color: 'rgb(198,132,255)'}]}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ [styles.buttonCnt, styles.delBtn ]}  onPress={()=>getValue('<')} >
                <Text style={ [styles.buttonNumber, {color: 'rgb(198,132,255)'}]}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ [styles.buttonCnt, styles.delBtn, styles.buttonOp]}  onPress={()=>getValue('+/-')} >
                <Text style={ [ styles.buttonNumber,{fontSize: 29}]}>{'+/-'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ [styles.buttonCnt,styles.buttonOp, styles.delBtn]}  onPress={()=>getValue('.')} >
                <Text style={styles.buttonNumber}>.</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            { dummiechar.map( char =>( 
                <View key={char} style={styles.wrapperCnt}>
                    {char=='-' || char=='+' || char=='/' || char=='*' || char=='%' || char==="="    
                        ? char=="="?
                            <TouchableOpacity style={ [styles.buttonCnt]} onPress={()=>getValue(char)}>
                                <Text style={ [styles.buttonNumber, {color: 'rgb(198,132,255)'}]}>
                                    {char}
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={ [styles.buttonCnt, styles.delBtn, styles.buttonOp]} onPress={()=>getValue(char)}>
                                <Text style={styles.buttonNumber}>
                                    {char}
                                </Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity style={styles.buttonCnt} onPress={()=>getValue(char)}>
                                <Text style={styles.buttonNumber}>
                                    {char}
                                </Text>
                            </TouchableOpacity>
                    }
                </View>
            ) ) } 
        </View>
    </View>
    )
}

const styles=StyleSheet.create({
    superCnt: {
        position: 'relative',
        zIndex: 10
    },  
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width - 22,
        paddingVertical: 10,
    },
    buttonNumber: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonOp: {
        backgroundColor: 'rgba(160,160,190,0.1)'
    },
    buttonCnt: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderTopColor: "rgba(255,255,255,0.45)",
        borderTopWidth: 1,
        borderLeftColor: "rgba(255,255,255,0.45)",
        borderLeftWidth: 2,
        borderStyle: 'solid',
        blurRadius: 90,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    wrapperCnt: {
        flex:1, 
        flexWrap: 'wrap',
        marginRight: 80,
        width: 80,
        height: 80,
        alignItems: 'center',
    },
    delBtn: {
        color: 'purple',
        marginRight: 10
    },
})