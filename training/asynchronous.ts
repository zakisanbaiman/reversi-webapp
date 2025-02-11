import fs from 'fs';
import util from 'util';

const promisifiedReadFile = util.promisify(fs.readFile);

async function main() {
  const data = await promisifiedReadFile('package.json', 'utf8');
  const fileContent = data.toString();
  console.log(fileContent);
  // readFilePromise.then((data) => {
  //   console.log(data.toString());
  // });


  // let fileContent: string = 'Not loeaded'
  // fs.readFile('package.json', 'utf8', (err, data) => {
  //   fileContent = data.toString();
  //   console.log(fileContent);
  // });
  // console.log(fileContent);
}

main();