---
title: "Syntax - Computer Programming"
slug: "syntax"
question: "What is a syntax error?"
answerchoices: ["A mistake in the language", "An error in the compiler", "An error in your code", "An error on your computer"]
correct: "An error in your code"
heading: "Computer Programming - Basic Syntax"
lesson: 3
prev: "env"
next: "datatypes"
desc: "In this section you will learn about the basic syntax of a C program"
unit: "Computer Programming"
---

Let’s start with a little coding, which will really make you a computer programmer. We are going to write a single-line computer program to write Hello, World! on your screen. Let’s see how it can be written using different programming languages.

## Hello World Program in C
Try the following example using the online compiler available at [geeksforgeeks.org](https://ide.geeksforgeeks.org/BOzGsFWIoA).

Try to change the content inside printf(), i.e., type anything in place of Hello World! and then check its result. It just prints whatever you keep inside the two double quotes.

```c
#include <stdio.h>

int main() {
   /* printf() function to write Hello, World! */
   printf( "Hello, World!" );
}
```
which produces the following result −
```
Hello, World!
```
This little Hello World program will help us understand various basic concepts related to C Programming.

### Program Entry Point
For now, just forget about the **`#include <stdio.h>`** statement, but keep a note that you have to put this statement at the top of a C program.

Every C program starts with main(), which is called the main function, and then it is followed by a left curly brace. The rest of the program instruction is written in between and finally a right curly brace ends the program.

The coding part inside these two curly braces is called the program body. The left curly brace can be in the same line as main(){ or in the next line like it has been mentioned in the above program.

### Functions
Functions are small units of programs and they are used to carry out a specific task. For example, the above program makes use of two functions: **`main()`** and **`printf()`**. Here, the function main() provides the entry point for the program execution and the other function printf() is being used to print an information on the computer screen.

You can write your own functions which we will see in a separate chapter, but C programming itself provides various built-in functions like main(), printf(), etc., which we can use in our programs based on our requirement.


### Comments
A C program can have statements enclosed inside **`/* <content here> */`**. Such statements are called comments and these comments are used to make the programs user friendly and easy to understand. The good thing about comments is that they are completely ignored by compilers and interpreters. So you can use whatever language you want to write your comments.

Whitespaces
When we write a program using any programming language, we use various printable characters to prepare programming statements. These printable characters are **```a, b, c,......z, A, B, C,.....Z, 1, 2, 3,...... 0, !, @, #, $, %, ^, &, *, (, ), -, _, +, =, \, |, {, }, [, ], :, ;, <, >, ?, /, \, ~. `. ", '.```** Hope I'm not missing any printable characters from your keyboard.

Apart from these characters, there are some characters which we use very frequently but they are invisible in your program and these characters are spaces, tabs (\t), new lines(\n). These characters are called **whitespaces**.

These three important whitespace characters are common in all the programming languages and they remain invisible in your text document −

| Whitespace | Explanation          | Representation |
| ---------- | -------------------- | -------------- |
| New Line   | To create a new line | \n             |
| Tab        | To create a tab.     | \t             |
| Space      | To create a space.   | empty space    |

A line containing only whitespace, possibly with a comment, is known as a blank line, and a C compiler totally ignores it. Whitespace is the term used in C to describe blanks, tabs, newline characters, and comments. So you can write **`printf("Hello, World!");`** as shown below. Here all the created spaces around "Hello, World!" are useless and the compiler will ignore them at the time of compilation.
```c
#include <stdio.h>

int main() {

   /* printf() function to write Hello, World! */
   
   printf(    "Hello, World!"      );
   
}
```
which produces the following result −

```
Hello, World!
```
If we make all these whitespace characters visible, then the above program will look like this and you will not be able to compile it −
```c
#include <stdio.h>\n
\n
int main()\n
{
   \n
   \t/* printf() function to write Hello, World! */
   \n 
   \tprintf(\t"Hello, World!"\t);\n
   \n
}\n
```

### Semicolons
Every individual statement in a C Program must be ended with a semicolon (;), for example, if you want to write "Hello, World!" twice, then it will be written as follows −
```c
#include <stdio.h>

int main() {
   /* printf() function to write Hello, World! */
   printf( "Hello, World!\n" );
   printf( "Hello, World!" );
}
```
This program will produce the following result −
```
Hello, World! 
Hello, World!
```
Here, we are using a new line character **\n** in the first printf() function to create a new line. Let us see what happens if we do not use this new line character −

```c
#include <stdio.h>

int main() {
   /* printf() function to write Hello, World! */
   printf( "Hello, World!" );
   printf( "Hello, World!" );
}
```
This program will produce the following result −
```
Hello, World! Hello, World!
```
We will learn identifiers and keywords in next few chapters.

### Program Explanation
Let us understand how the above C program works. First of all, the above program is converted into a binary format using C compiler. So let’s put this code in test.c file and compile it as follows −
```bash
$> gcc test.c -o demo
```
If there is any grammatical error (Syntax errors in computer terminologies), then we fix it before converting it into binary format. If everything goes fine, then it produces a binary file called **demo**. Finally, we execute the produced binary demo as follows −
```bash
$> ./demo
```
which produces the following result −
```
Hello, World!
```
Here, when we execute the binary a.out file, the computer enters inside the program starting from `main()` and encounters a `printf()` statement. Keep a note that the line inside `/*....*/` is a comment and it is filtered at the time of compilation. So printf() function instructs the computer to print the given line at the computer screen. Finally, it encounters a right curly brace which indicates the end of `main()` function and exits the program.

### Syntax Error
If you do not follow the rules defined by the programing language, then at the time of compilation, you will get syntax errors and the program will not be compiled. From syntax point of view, even a single dot or comma or a single semicolon matters and you should take care of such small syntax as well. In the following example, we have skipped a semicolon, let's try to compile the program −

```c
#include <stdio.h>

main() {
   printf("Hello, World!")
}
```
This program will produce the following result −
```
main.c: In function 'main':
main.c:7:1: error: expected ';' before '}' token
 }
 ^
```
So the bottom-line is that if you are not following proper syntax defined by the programming language in your program, then you will get syntax errors. Before attempting another compilation, you will need to fix them and then proceed.

## Hello World Program in Java
Following is the equivalent program written in Java. This program will also produce the same result **Hello, World!**.

```java
public class HelloWorld { 
   public static void main(String []args) {
      /* println() function to write Hello, World! */
      System.out.println("Hello, World!");
   }
}
```
which produces the following result −
```
Hello, World!
```
## Hello World Program in Python
Following is the equivalent program written in Python. This program will also produce the same result **Hello, World!**.

```py
#  print function to write Hello, World! */
print("Hello, World!")
```

which produces the following result −
```
Hello, World!
```
Hope you noted that for C and Java examples, first we are compiling the programs and then executing the produced binaries, but in Python program, we are directly executing it. As we explained in the previous chapter, Python is an interpreted language and it does not need an intermediate step called compilation.

Python does not require a semicolon (;) to terminate a statement, rather a new line always means termination of the statement.