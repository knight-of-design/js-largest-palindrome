/*
 * Various implementations of finding the largest palindrome which is a product of two numbers size n and is a multiple of d
 *
 */

function LargestPalindrome(){}

LargestPalindrome.byDiagonalSymmetry = function (n,d) {
    var limit = Math.pow(10,n)-1,
        y = limit,
        x = y,
        upperY = limit,
        highestP = (limit%d)?0:limit,
        diagonalOffset = 0,
        searching = true,
        p = x*y;
    
    while (searching){
        p = y * x;
        if ( p%d == 0 && p%10!=0 && p > highestP && isPalindrome(p)){
            highestP = p
        }
        
        if (limit * upperY < highestP) {
            searching = false;
            break;
        }
        
       
        if (x == limit || y==1){
            y-= 1;
            diagonalOffset = upperY - y - 1;
            y += diagonalOffset;
            x -= diagonalOffset;
            
        }
        else {
            x++;
            y--;
        }
      
        
        if (x==y){
            upperY = y;
        }
             
    }
    return highestP;
   
};

LargestPalindrome.byBasicElimination = function (n,d) {
     var limit = Math.pow(10,n)-1,
         highestP = (limit % d)?0:limit;
    
    for (var i=limit,p; i * i > highestP; i--){
        if (i % 10 == 0) {
            continue;
        }
        for (var j=i, p=j*i; p > highestP; j--){
            p = j * i;
            if (p%10==0) { 
                continue; 
            }
            if (p > highestP && p % d == 0 && isPalindrome(p)){
                highestP = p;
            }   
        }
    }

    return highestP;
}
    

function test(name,n,d){
    var fn = LargestPalindrome[name],
        start = (new Date()).getTime(),
        result = fn(n,d),
        end = (new Date()).getTime();
    console.log(name,":", result, "in", (end-start)/1000,"seconds")
}

function isPalindrome(n){
    var str = ""+n,
        k = str.length-1;
    
    for (var i=0; i<k/2; i++){
        if (str[i]!=str[k-i]) {
            return false;
        }
    }
    
    return true;
}

console.log("Largest Palindromes\n==================")
for (var d=1; d<=30; d+=Math.ceil(Math.random()*5)){
    console.log("\nTest: n=3 d="+d);
    test("byDiagonalSymmetry",4,d);
    test("byBasicElimination",4,d);
}
