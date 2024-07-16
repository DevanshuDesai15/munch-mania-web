import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  background-color: #4ecdc4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b7aa;
  }
`;

const SuggestionContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SuggestionTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const SuggestionText = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

function App() {
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async (cuisine = '') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/suggestion?cuisine=${cuisine}`);
      setSuggestion(response.data.suggestions);
    } catch (err) {
      console.log('Error fetching suggestions:', err);
    }
  };

  return (
    <AppContainer>
      <Title>Munch Mania</Title>
      <SuggestionForm onSubmit={fetchSuggestions} />
      <FoodSuggestion suggestion={suggestion} />
    </AppContainer>
  );
}

const SuggestionForm = ({ onSubmit }) => {
  const [cuisine, setCuisine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cuisine);
    setCuisine('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Cuisine:
        <Input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter a cuisine (e.g., Italian, Mexican)"
        />
      </Label>
      <Button type="submit">Get Suggestion</Button>
    </Form>
  );
};

const FoodSuggestion = ({ suggestion }) => {
  return (
    <SuggestionContainer>
      <SuggestionTitle>Food Suggestion</SuggestionTitle>
      <SuggestionText>{suggestion || 'No suggestion yet. Try entering a cuisine!'}</SuggestionText>
    </SuggestionContainer>
  );
};

export default App;