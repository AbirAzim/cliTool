const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
// const { help } = require('yargs');

let myTodoList = [];

let content = fs.readFileSync('mytodos.txt', 'utf8');

if (!(content === '')) {
  content.split(',').forEach((el) => {
    myTodoList.push(el);
  });
}

let init = function (command) {
  switch (command[0]) {
    case 'add': {
      add(command[1]);
      break;
    }

    case 'done': {
      done();
      break;
    }

    case 'showAll': {
      showAll();
      break;
    }

    case 'edit': {
      edit(command[1], command[2]);
      break;
    }

    case 'helpAll': {
      helpAll();
    }
  }
};

function add(item) {
  myTodoList.push(item);
  console.log(chalk.red('1 item added'));
  fs.writeFileSync('mytodos.txt', myTodoList);
  console.log(myTodoList);
}

function done() {
  console.log(chalk.red(`${myTodoList[0]} is done!`));
  myTodoList.shift();
  fs.writeFileSync('mytodos.txt', myTodoList);
  console.log(myTodoList);
}

function showAll() {
  myTodoList.forEach((element, index) => {
    console.log(
      chalk.blue(`task: ${element}`),
      chalk.green(`id: ${index + 1}`)
    );
  });
}

function edit(id, text) {
  console.log(chalk.red(`${id} is edited!`));
  myTodoList[id - 1] = text;
  fs.writeFileSync('mytodos.txt', myTodoList);
}

function helpAll() {
  let allCommand = [
    {
      name: 'add',
      desc: 'Add A Todo',
    },
    {
      name: 'done1',
      desc: 'Delete The Current Todo',
    },
    {
      name: 'showAll',
      desc: 'Get All The Todos',
    },
    {
      name: 'edit',
      desc:
        "enter index and your edited value separating with space('id' 'your text')",
    },
  ];

  console.log(allCommand);
}

init(yargs.argv._);
