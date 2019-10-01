import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import centerImg from '../assets/images/components/center.jpg';
import TableDataComponent from './TableDataComponent';

const suggestions = [
  { id:1, firstName: 'Surya', lastName: 'Raj', dob: '10/05/1990', hccid: 'HCCID101', ssn: 'SSN101', hic: 'HIC101', mbi: 'MBI101' },
  { id:2, firstName: 'Kumar', lastName: 'Ramalingam', dob: '21/05/1990', hccid: 'HCCID102', ssn: 'SSN102', hic: 'HIC102', mbi: 'MBI102' },
  { id:3, firstName: 'Ronan', lastName: 'Solo', dob: '12/02/1989', hccid: 'HCCID103', ssn: 'SSN103', hic: 'HIC103', mbi: 'MBI103' },
  { id:4, firstName: 'Brayden', lastName: 'Watson', dob: '11/03/1990', hccid: 'HCCID104', ssn: 'SSN104', hic: 'HIC104', mbi: 'MBI104' },
  { id:5, firstName: 'Hugo', lastName: 'Bar', dob: '14/04/1990', hccid: 'HCCID105', ssn: 'SSN105', hic: 'HIC105', mbi: 'MBI105' },
  { id:6, firstName: 'Diego', lastName: 'John', dob: '17/09/1990', hccid: 'HCCID106', ssn: 'SSN106', hic: 'HIC106', mbi: 'MBI106' },
  { id:7, firstName: 'Antonio', lastName: 'Williams', dob: '20/08/1990', hccid: 'HCCID107', ssn: 'SSN107', hic: 'HIC107', mbi: 'MBI107' },
  { id:8, firstName: 'Marco', lastName: 'Rock', dob: '27/09/1990', hccid: 'HCCID108', ssn: 'SSN108', hic: 'HIC108', mbi: 'MBI108' },
  { id:9, firstName: 'Steffan', lastName: 'Rick', dob: '28/02/1990', hccid: 'HCCID109', ssn: 'SSN109', hic: 'HIC109', mbi: 'MBI109' },
  { id:10, firstName: 'Devin', lastName: 'Geek', dob: '11/05/1990', hccid: 'HCCID1010', ssn: 'SSN1010', hic: 'HIC1010', mbi: 'MBI1010' }
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.firstName + " " + suggestion.lastName, query);
  const parts = parse(suggestion.firstName + " " + suggestion.lastName, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : inputLength >= 4 ? suggestions.filter(function(wine){
        return Object.values(wine).some( val =>
            String(val).toLowerCase().includes(inputValue)
        );
    }) : '';
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  searchBarContainer: {
    display: 'inline-block',
    textAlign: 'center',
    position: 'relative',
    top:100,
    width:'66%'
  },
  imgSection: {
    marginBottom: 25
  },
  imgStyle: {
    width:275,
    height:200
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function SearchBarComponent() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    single: ''
  });

  const [suggestionData, setSuggestionData] = React.useState([]);
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const [tableStatus, setTableStatus] = React.useState(false);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const getSuggestionValue = (suggestion) => {
    setSuggestionData(suggestion);
    setTableStatus(true);

    return suggestion.firstName + " " + suggestion.lastName;
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.imgSection}>
        <img src={centerImg} alt="connect-service" className={classes.imgStyle} />
      </div>
      <form className={classes.container} noValidate autoComplete="off">
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            id: 'auto-searchbar',
            label: 'Search by First/Last Name, Last/First Name, Last name w/DOB, HCCID, SSN#, HIC or MBI',
            value: state.single,
            onChange: handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </form>
      <TableDataComponent
        suggestionData={[suggestionData]}
        tableStatus={tableStatus}
      />
  </div>
  );
}