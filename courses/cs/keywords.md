---
title: "Keywords"
slug: "keywords"
question: "Which of the following is NOT a reserved keyword?"
answerchoices: ["char", "int", "class", "then"]
correct: "then"
heading: "Computer Programming - Keywords"
lesson: 6
prev: "variables"
next: "operators"
desc: "In this section you will learn about reserved keywords"
unit: "Computer Programming"
---

So far, we have covered two important concepts called variables and their data types. We discussed how to use **int**, **long**, and **float** to specify different data types. We also learnt how to name the variables to store different values.

Though this chapter is not required separately because reserved keywords are a part of basic programming syntax, we kept it separate to explain it right after data types and variables to make it easy to understand.

Like int, long, and float, there are many other keywords supported by C programming language which we will use for different purpose. Different programming languages provide different set of reserved keywords, but there is one important & common rule in all the programming languages that we cannot use a reserved keyword to name our variables, which means we cannot name our variable like **int** or **float** rather these keywords can only be used to specify a variable data type.

For example, if you will try to use any reserved keyword for the purpose of variable name, then you will get a syntax error.

```c
#include <stdio.h>

int main() {
   int float;
   float = 10;

   printf( "Value of float = %d\n", float);
}
```

When you compile the above program, it produces the following error −

```
main.c: In function 'main':
main.c:5:8: error: two or more data types in declaration specifiers
   int float;
......
```

Let's now give a proper name to our integer variable, then the above program should compile and execute successfully −

```c
#include <stdio.h>

int main() {
   int count;
   count = 10;

   printf( "Value of count = %d\n", count);
}
```

## C Programming Reserved Keywords

Here is a table having almost all the keywords supported by C Programming language −
| | | | |
| -------- | ------ | -------- | -------- |
| auto | else | long | switch |
| break | enum | register | typedef |
| case | extern | return | union |
| char | float | short | unsigned |
| const | for | signed | void |
| continue | goto | sizeof | volatile |
| default | if | static | while |
| do | int | struct | \_Packed |
| double |

## Java Programming Reserved Keywords

Here is a table having almost all the keywords supported by Java Programming language −
| | | | |
| -------- | ------------ | -------- | ---------- |
| abstract | assert | boolean | break |
| byte | case | catch | char |
| class | const | continue | default |
| do | double | else | enum |
| extends | final | finally | float |
| for | goto | if | implements |
| import | instanceof | int | interface |
| long | native | new | package |
| private | protected | public | return |
| short | static | strictfp | super |
| switch | synchronized | this | throw |
| throws | transient | try | void |
| volatile | while |

## Python Programming Reserved Keywords

Here is a table having almost all the keywords supported by Python Programming language −
| | | |
| -------- | ------- | ------ |
| and | exec | not |
| assert | finally | or |
| break | for | pass |
| class | from | print |
| continue | global | raise |
| def | if | return |
| del | import | try |
| elif | in | while |
| else | is | with |
| except | lambda | yield |

We know you cannot memorize all these keywords, but we have listed them down for your reference purpose and to explain the concept of reserved keywords. So just be careful while giving a name to your variable, you should not use any reserved keyword for that programming language.
