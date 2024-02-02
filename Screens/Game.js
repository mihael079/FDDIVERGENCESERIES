import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import originalData from '../riskmitigation.json';

const convertData = (data) => {
  return data.reduce((acc, item) => {
    const slNo = item["SL NO"];
    const existingQuestion = acc.find(entry => entry.question === item.QUESTIONS);

    if (existingQuestion) {
      existingQuestion.options.push({
        text: item.ANSWERS,
        score: parseInt(item.SCORE),
        attribute: item.ATTRIBUTE,
        slNo: item["SL NO"],
      });
    } else {
      acc.push({
        id: slNo,
        question: item.QUESTIONS,
        options: [{
          text: item.ANSWERS,
          score: parseInt(item.SCORE),
          attribute: item.ATTRIBUTE,
          slNo: item["SL NO"],
        }],
      });
    }

    return acc;
  }, []);
};

const originalFormattedData = convertData(originalData);

const getRandomQuestions = (start, end) => {
  const questions = originalFormattedData.slice(start, end);
  return questions.sort(() => Math.random() - 0.5).slice(0, 5);
};

const randomQuestions1to20 = getRandomQuestions(0, 20);
const randomQuestions21to40 = getRandomQuestions(20, 40);
const randomQuestions41to60 = getRandomQuestions(40, 60);
const randomQuestions61to80 = getRandomQuestions(60, 80);
const randomQuestions81to100 = getRandomQuestions(80, 100);
const randomQuestions101to120 = getRandomQuestions(100, 120);
const randomQuestions121to140 = getRandomQuestions(120, 140);

const buttonColors = ['yellow', 'turquoise', 'orange', 'silver', '#33E6FF'];

export default function Game() {
  const [sets, setSets] = useState([
    randomQuestions1to20,
    randomQuestions21to40,
    randomQuestions41to60,
    randomQuestions61to80,
    randomQuestions81to100,
    randomQuestions101to120,
    randomQuestions121to140,
  ]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({});
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Fetch data if needed
  }, []);

  const handleAnswer = (selectedScore, slNo, attribute) => {
    setScore(prevScore => ({
      ...prevScore,
      [attribute]: (prevScore[attribute] || 0) + selectedScore,
    }));

    if (currentQuestionIndex < sets[currentSetIndex].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to the next set of questions
      if (currentSetIndex < sets.length - 1) {
        setCurrentSetIndex(currentSetIndex + 1);
        setCurrentQuestionIndex(0);
      } else {
        setShowScore(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentSetIndex(0);
    setCurrentQuestionIndex(0);
    setScore({});
    setShowScore(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View>
          {Object.entries(score).map(([attribute, attributeScore], index) => (
            <Text key={attribute} style={styles.scoreText}>{attribute}: {attributeScore}</Text>
          ))}
          <Button title="Reset Quiz" onPress={handleReset} />
        </View>
      ) : (
        <View>
          <Text style={styles.scenarioText}>{sets[currentSetIndex][currentQuestionIndex].question}</Text>
          {sets[currentSetIndex][currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => handleAnswer(option.score, option.slNo, option.attribute)}>
              <View style={[styles.button, { backgroundColor: buttonColors[index % buttonColors.length] }]}>
                <Text>{option.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scenarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});
