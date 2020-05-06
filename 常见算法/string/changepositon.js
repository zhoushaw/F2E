

function hasChange(str1,str2){
    var nArr1 = str1.split('').sort((a,b)=>{
        return a.charCodeAt()>b.charCodeAt();
    })
    var nArr2 = str2.split('').sort((a, b) => {
        return a.charCodeAt() > b.charCodeAt();
    })
    return nArr1.join('')===nArr2.join('');
}

console.log(hasChange("rat", "car"))
console.log(hasChange("anagram", "nagaram"))