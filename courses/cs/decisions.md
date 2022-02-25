---
title: "Decisions"
slug: "decisions"
question: "What operator would you use to check if 20 divided by 10 is equal to 2?"
answerchoices: ["==", "!=", "<", ">"]
correct: "=="
heading: "Computer Programming - Decisions"
lesson: 8
prev: "operators"
next: "loops"
desc: "In this section you will learn about conditional statements."
unit: "Computer Programming"
---

Decision making is critical to computer programming. There will be many situations when you will be given two or more options and you will have to select an option based on the given conditions. For example, we want to print a remark about a student based on his secured marks. Following is the situation −

```
Assume given marks are x for a student:

If given marks are more than 95, then
Student is brilliant

If given marks are less than 30, then
Student is poor

If given marks are less than 95 and more than 30, then
Student is average
```

Now, the question is how to write a programming code to handle such situations. Almost all the programming languages provide conditional statements that work based on the following flow diagram −

![Conditional statement chart](https://www.tutorialspoint.com/computer_programming/images/decision_making.jpg)

Let's write a C program with the help of if conditional statements to convert the above given situation into a programming code −

```c
#include <stdio.h>

int main() {
   int x = 45;

   if (x > 95) {

      printf( "Student is brilliant\n");
   }
   if (x < 30) {

      printf( "Student is poor\n");
   }
   if (x < 95 && x > 30) {

      printf( "Student is average\n");
   }
}
```

When the above program is executed, it produces the following result −

```
Student is average
```

The above program uses **if conditional statements**. Here, the first **if statement** checks whether the given condition i.e., variable x is greater than 95 or not and if it finds the condition is true, then the conditional body is entered to execute the given statements. Here we have only one printf() statement to print a remark about the student.

Similarly, the second **if statement** works. Finally, the third if statement is executed, here we have the following two conditions −

- First condition is **x > 95**
- Second condition is **x < 30**

The computer evaluates both the given conditions and then, the overall result is combined with the help of the binary operator **&&**. If the final result is true, then the conditional statement will be executed, otherwise no statement will be executed.

This tutorial will give you a basic idea on various forms of **if statements** and an introduction to **switch statements** available in C programming language. Different programming languages provide different types of decision-making statements, but the basic concept remains the same as explained in this tutorial.

## if...else statement

An **if** statement can be followed by an optional **else** statement, which executes when the Boolean expression is false. The syntax of an **if...else** statement in C programming language is −

```c
if (boolean_expression) {

   /* Statement(s) will execute if the boolean expression is true */
} else {

  /* Statement(s) will execute if the boolean expression is false */
}
```

The above syntax can be represented in the form of a flow diagram as shown below −

![If...Else Flowchart](https://www.tutorialspoint.com/computer_programming/images/if_else_statement.jpg)

An **if...else** statement is useful when we have to take a decision out of two options. For example, if a student secures more marks than 95, then the student is brilliant, otherwise no such situation can be coded, as follows −

```c
#include <stdio.h>

int main() {
   int x = 45;

   if (x > 95) {
      printf( "Student is brilliant\n");
   } else {
      printf( "Student is not brilliant\n");
   }
}
```

When the above program is executed, it produces the following result −

```
Student is not brilliant
```
