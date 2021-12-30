---
title: "Data Types - Computer Programming"
slug: "datatypes"
question: "What datatype would you use to represent a single character in Java or C?"
answerchoices: ["int", "short", "string", "char"]
correct: "char"
heading: "Computer Programming - Data Types"
lesson: 4
prev: "syntax"
next: "datatypes"
desc: "learn about common primitive data types"
unit: "Computer Programming"
---

Let's discuss about a very simple but very important concept available in almost all the programming languages which is called **data types**. As its name indicates, a data type represents a type of the data which you can process using your computer program. It can be numeric, alphanumeric, decimal, etc.

Let’s keep Computer Programming aside for a while and take an easy example of adding two whole numbers 10 and 20, which can be done simply as follows −
```
10 + 20
```
Let's take another problem where we want to add two decimal numbers 10.50 and 20.50, which will be written as follows −
```
10.50 + 20.50
```
The two examples are straightforward. Now let's take another example where we want to record student information in a notebook. Here we would like to record the following information −
```
Name:
Grade:
Section:
Age:
Gender:
```
Now, let's put one student record as per the given requirement −
```
Name: Zara Ali
Grade: 6th
Section: J
Age: 13
Gender: F
```
The first example dealt with whole numbers, the second example added two decimal numbers, whereas the third example is dealing with a mix of different data. Let's put it as follows −

* Student name "Zara Ali" is a sequence of characters which is also called a string.

* Student class "6th" has been represented by a mix of whole number and a string of two characters. Such a mix is called alphanumeric.

* Student section has been represented by a single character which is 'J'.

* Student age has been represented by a whole number which is 13.

* Student gender has been represented by a single character which is 'F'.

This way, we realized that in our day-to-day life, we deal with different types of data such as strings, characters, whole numbers (integers), and decimal numbers (floating point numbers).

Similarly, when we write a computer program to process different types of data, we need to specify its type clearly; otherwise the computer does not understand how different operations can be performed on that given data. Different programming languages use different keywords to specify different data types. For example, C and Java programming languages use **int** to specify integer data, whereas **char** specifies a character data type.

Subsequent chapters will show you how to use different data types in different situations. For now, let's check the important data types available in C, Java, and Python and the keywords we will use to specify those data types.

## C and Java Data Types
C and Java support almost the same set of data types, though Java supports additional data types. For now, we are taking a few common data types supported by both the programming languages −

| Type           | Keyword | Value range which can be represented by this data type |
| -------------- | ------- | ------------------------------------------------------ |
| Character      | char    | -128 to 127 or 0 to 255                                |
| Number         | int     | -32,768 to 32,767 or -2,147,483,648 to 2,147,483,647   |
| Small Number   | short   | -32,768 to 32,767                                      |
| Long Number    | long    | -2,147,483,648 to 2,147,483,647                        |
| Decimal Number | float   | 1.2E-38 to 3.4E+38 till 6 decimal places               |

These data types are called primitive data types and you can use these data types to build more complex data types, which are called user-defined data type, for example a string will be a sequence of characters.

## Python Data Types
Python has five standard data types but this programming language does not make use of any keyword to specify a particular data type, rather Python is intelligent enough to understand a given data type automatically.

* Numbers
* String
* List
* Tuple
* Dictionary


Here, Number specifies all types of numbers including decimal numbers and string represents a sequence of characters with a length of 1 or more characters. For now, let's proceed with these two data types and skip List, Tuple, and Dictionary, which are advanced data types in Python.