import React, {useState, Component} from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import params from './src/params';
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed } from './src/functions';
import MineField from './src/components/MineField';
import Header  from './src/components/Header';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

   minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols*rows*params.difficultLevel);    
  }
  
   createState =() =>{
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board : createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }
  }


onSelectField = (row, column)=> {
  const board = cloneBoard(this.state.board);
  invertFlag(board, row, column);
  const won = wonGame(board);

  if (won){
    Alert.alert ('You Win!')
  }
  this.setState({board, won});
}

 onOpenField = (row, column) => {
      const board = cloneBoard(this.state.board);
      openField(board, row, column);
      const lost = hadExplosion(board);
      const won = wonGame(board);

      if (lost){
        showMines(board);
        Alert.alert('You Lost!')
      }
      if (won){
        Alert.alert ('You Win!')
      }
    this.setState({board, lost, won});
}

render (){
  return (
    <View style={styles.container}>
       <Header 
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} 
          onNewGame={()=> this.setState(this.createState())} />
      <View style={styles.board} >
          <MineField 
              board={this.state.board} 
              onOpenField={this.onOpenField} 
              onSelectField={this.onSelectField}
          />
      </View>
{/*     <Field />
      <Field opened />
      <Field opened nearMines={1}/>
      <Field opened nearMines={2}/>
      <Field opened nearMines={3}/>
      <Field opened nearMines={6}/>
      <Field mined />
      <Field mined opened/>
      <Field mined opened exploded/>
      <Field flagged/>
<Field flagged opened/> */}


    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }

});
