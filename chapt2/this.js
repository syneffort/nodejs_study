console.log(this);
console.log(this === module.exports);

function a() {
    console.log(this === global);
}
a();

const b = () => {
    console.log(this === module.exports);
}
b();