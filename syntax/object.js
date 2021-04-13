const members = ['tiger', 'ho', 'hwang'];
console.log(members[0]);

let roles = {
  'programmer': 'tiger',
  'designer': 'ho',
  'manager': 'hwang'
}

console.log(roles.manager);

for(var key in roles){
  console.log('key=>', key, 'value=>', roles[key]);
}