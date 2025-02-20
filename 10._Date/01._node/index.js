console.log(new Date()); //UTC  Standard ISO 8601

console.log(Date()) // local date

console.log(Date.now()) // unix Epoch

console.log("\ntoLocalString")
console.log(new Date().toLocaleString());

const date = new Date();

const danishDate = new Intl.DateTimeFormat("da-dk").format(date);

console.log("\nDanish Date: " + danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);


console.log("\nAmerican Date: " + americanDate);
