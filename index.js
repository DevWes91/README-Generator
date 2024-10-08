// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [ {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
},
{
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
},
{
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?',
},
{
    type: 'input',
    name: 'usage',
    message: 'How do you use this application?',
},
{
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None']
  },
{
    type: 'input',
    name: 'contributing',
    message: 'What are the contribution guidelines?',
},
{
    type: 'input',
    name: 'tests',
    message: 'What are the test instructions?',
},
{
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
},
{
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
},
];

// Function to generate README content
function generateREADME(answers) {
    return [
        '# ' + answers.title,
        '',
        getLicenseBadge(answers.license),
        '',
        '## Description',
        '',
        answers.description,
        '',
        '## Table of Contents',
        '',
        '- [Installation](#installation)',
        '- [Usage](#usage)',
        '- [License](#license)',
        '- [Contributing](#contributing)',
        '- [Tests](#tests)',
        '- [Questions](#questions)',
        '',
        '## Installation',
        '',
        answers.installation,
        '',
        '## Usage',
        '',
        answers.usage,
        '',
        '## License',
        '',
        'This project is licensed under the ' + answers.license + ' license.',
        '',
        '## Contributing',
        '',
        answers.contributing,
        '',
        '## Tests',
        '',
        answers.tests,
        '',
        '## Questions',
        '',
        'For any questions, please contact me:',
        '',
        'GitHub: [' + answers.github + '](https://github.com/' + answers.github + ')',
        'Email: ' + answers.email
    ].join('\n');
}


  // Function to get license badge
function getLicenseBadge(license) {
    const badges = {
      'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
      'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
      'GPL 3.0': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
      'BSD 3-Clause': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
      'None': '',
    };
    return badges[license] || '';
  }

// TODO: Create a function to write README file
function writeToFile(fileName, data, callback) {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error('An error occurred while writing the file:', err);
        return callback(err);
      }
      console.log('README.md successfully generated!');
      callback(null);
    });
  }

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
      const readmeContent = generateREADME(answers);
      writeToFile('README.md', readmeContent, (err) => {
        if (err) {
          console.error('Failed to write README.md');
        }
      });
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// Function call to initialize app
init();
