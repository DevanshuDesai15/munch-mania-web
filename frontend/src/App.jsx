/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Clock, Star, ChefHat } from 'lucide-react';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffdaaf;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #6f3c15;
  text-align: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
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
  font-size: 1.4rem;
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
  background-color: #744223;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a87252;
    color: black;
  }
`;

const SuggestionContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SuggestionTitle = styled.h2`
  color: #874f21;
  margin-bottom: 1rem;
`;

const SuggestionDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
`;

const SuggestionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const IngredientItem = styled.li`
  background-color: #d7aa86;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

function App() {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async (cuisine = '') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/suggestion?cuisine=${cuisine}`);
      console.log('Response:', response.data);
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
      <Button onClick={() => fetchSuggestions()} style={{ marginTop: '1rem' }}>Get Another Suggestion</Button>
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
  if (!suggestion) {
    return <SuggestionContainer>No suggestion yet. Try entering a cuisine!</SuggestionContainer>;
  }

  return (
    <SuggestionContainer>
      <SuggestionTitle>{suggestion.name}</SuggestionTitle>
      <SuggestionDescription>{suggestion.description}</SuggestionDescription>
      <SuggestionDetails>
        <DetailItem>
          <Clock size={16} />
          {suggestion.prepTime}
        </DetailItem>
        <DetailItem>
          <ChefHat size={16} />
          {suggestion.difficulty}
        </DetailItem>
        <DetailItem>
          <Star size={16} />
          {suggestion.rating}/5
        </DetailItem>
      </SuggestionDetails>
      <h3>Key Ingredients:</h3>
      <IngredientsList>
        {suggestion.ingredients.map((ingredient, index) => (
          <IngredientItem key={index}>{ingredient}</IngredientItem>
        ))}
      </IngredientsList>
    </SuggestionContainer>
  );
};

export default App;