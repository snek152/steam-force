---
title: "Operators - Computer Programming"
slug: "operators"
question: "What operator would you use to check if 20 divided by 10 is equal to 2?"
answerchoices: ["==", "!=", "<", ">"]
correct: "=="
heading: "Computer Programming - Operators"
lesson: 7
prev: "keywords"
next: "decisions"
desc: "In this section you will learn about arithmetic and relational operators"
unit: "Computer Programming"
---

An operator in a programming language is a symbol that tells the compiler or interpreter to perform specific mathematical, relational or logical operation and produce final result. This chapter will explain the concept of **operators** and it will take you through the important arithmetic and relational operators available in C, Java, and Python.

## Arithmetic Operators

Computer programs are widely used for mathematical calculations. We can write a computer program which can do simple calculation like adding two numbers (2 + 3) and we can also write a program, which can solve a complex equation like P(x) = x<sup>4</sup> + 7x<sup>3</sup> - 5x + 9. In first expression 2 and 3 are operands and + is an operator. Similar concepts exist in Computer Programming.

Take a look at the following two examples −

2 + 3<br />
P(x) = x<sup>4</sup> + 7x<sup>3</sup> - 5x + 9.

These two statements are called arithmetic expressions in a programming language and **plus, minus** used in these expressions are called arithmetic operators and the values used in these expressions like 2, 3 and x, etc., are called operands. In their simplest form, such expressions produce numerical results.

Similarly, a programming language provides various arithmetic operators. The following table lists down a few of the important arithmetic operators available in C programming language. Assume variable A holds 10 and variable B holds 20, then −

| Operator | Description                                 | Example              |
| -------- | ------------------------------------------- | -------------------- |
| +        | Adds two operands                           | A + B will give 30   |
| -        | Subtracts second operand from the first     | A - B will give -10  |
| \*       | Multiplies both operands                    | A \* B will give 200 |
| /        | Divides numerator by de-numerator           | B / A will give 2    |
| %        | This gives remainder of an integer division | B % A will give 0    |

Following is a simple example of C Programming to understand the above mathematical operators −

```c
#include <stdio.h>

int main() {
   int a, b, c;

   a = 10;
   b = 20;

   c = a + b;
   printf( "Value of c = %d\n", c);

   c = a - b;
   printf( "Value of c = %d\n", c);

   c = a * b;
   printf( "Value of c = %d\n", c);

   c = b / a;
   printf( "Value of c = %d\n", c);

   c = b % a;
   printf( "Value of c = %d\n", c);
}
```

When the above program is executed, it produces the following result −

```
Value of c = 30
Value of c = -10
Value of c = 200
Value of c = 2
Value of c = 0
```

## Relational Operators

Consider a situation where we create two variables and assign them some values as follows −

```
A = 20
B = 10
```

Here, it is obvious that variable A is greater than B in values. So, we need the help of some symbols to write such expressions which are called relational expressions. If we use C programming language, then it will be written as follows −

```
(A > B)
```

Here, we used a symbol > and it is called a relational operator and in their simplest form, they produce Boolean results which means the result will be either true or false. Similarly, a programming language provides various relational operators. The following table lists down a few of the important relational operators available in C programming language. Assume variable **A** holds 10 and variable **B** holds 20, then −

| Operator | Description                                                                                                                     | Example               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| ==       | Checks if the values of two operands are equal or not, if yes then condition becomes true.                                      | (A == B) is not true. |
| !=       | Checks if the values of two operands are equal or not, if values are not equal then condition becomes true.                     | (A != B) is true.     |
| >        | Checks if the value of left operand is greater than the value of right operand, if yes then condition becomes true.             | (A > B) is not true.  |
| <        | Checks if the value of left operand is less than the value of right operand, if yes then condition becomes true.                | (A < B) is true.      |
| >=       | Checks if the value of left operand is greater than or equal to the value of right operand, if yes then condition becomes true. | (A >= B) is not true. |
| <=       | Checks if the value of left operand is less than or equal to the value of right operand, if yes then condition becomes true.    | (A <= B) is true.     |

Here, we will show you one example of C Programming which makes use of the **if conditional statement**. Though this statement will be discussed later in a separate chapter, but in short, we use **if statement** to check a condition and if the condition is true, then the body of **if statement** is executed, otherwise the body of **if statement** is skipped.

```c
#include <stdio.h>

int main() {
   int a, b;

   a = 10;
   b = 20;

   /* Here we check whether a is equal to 10 or not */
   if( a == 10 ) {

      /* if a is equal to 10 then this body will be executed */
      printf( "a is equal to 10\n");
   }

   /* Here we check whether b is equal to 10 or not */
   if( b == 10 ) {

      /* if b is equal to 10 then this body will be executed */
      printf( "b is equal to 10\n");
   }

   /* Here we check if a is less b than or not */
   if( a < b ) {

      /* if a is less than b then this body will be executed */
      printf( "a is less than b\n");
   }

   /* Here we check whether a and b are not equal */
   if( a != b ) {

      /* if a is not equal to b then this body will be executed */
      printf( "a is not equal to b\n");
   }
}
```

When the above program is executed, it produces the following result −

```
a is equal to 10
a is less than b
a is not equal to b
```

## Operators in Java

Following is the equivalent program written in Java. C programming and Java provide almost identical set of operators and conditional statements. This program will create two variables **a** and **b**, very similar to C programming, then we assign 10 and 20 in these variables and finally, we will use different arithmetic and relational operators −

You can try to execute the following program to see the output, which must be identical to the result generated by the above example.

```java
public class DemoJava {
   public static void main(String []args) {
      int a, b, c;

      a = 10;
      b = 20;

      c = a + b;
      System.out.println("Value of c = " + c );

      c = a - b;
      System.out.println("Value of c = " + c );

      c = a * b;
      System.out.println("Value of c = " + c );

      c = b / a;
      System.out.println("Value of c = " + c );

      c = b % a;
      System.out.println("Value of c = " + c );

      if( a == 10 ) {

         System.out.println("a is equal to 10" );
      }
   }
}
```

When the above program is executed, it produces the following result −

```
Value of c = 30
Value of c = -10
Value of c = 200
Value of c = 2
Value of c = 0
a is equal to 10
```

## Operators in Python

Following is the equivalent program written in Python. This program will create two variables **a** and **b** and at the same time, assign 10 and 20 in those variables. Fortunately, C programming and Python programming languages provide almost identical set of operators.

You can try to execute the following program to see the output, which must be identical to the result generated by the above example.

```py
a = 10
b = 20

c = a + b
print("Value of c = ", c)

c = a - b
print("Value of c = ", c)

c = a * b
print("Value of c = ", c)

c = a / b
print("Value of c = ", c)

c = a % b
print("Value of c = ", c)

if( a == 10 ):
   print("a is equal to 10"()
```

When the above program is executed, it produces the following result −

```
Value of c =  30
Value of c =  -10
Value of c =  200
Value of c =  0
Value of c =  10
a is equal to 10
```
