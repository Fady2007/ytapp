import random
import requests
import time
from flask import Flask, render_template, request
import numpy as np
from module import *


# this function for getting random number in range a number that you will choose
def getR_Num(rangeCount):
    """rangeCount should be greater than 2"""
    msg = ""
    li = []
    if rangeCount > 2:
        for i in range(rangeCount):
            li.append(i + 1)
            random.shuffle(li)
            msg = li
    else:
        msg = "RangeCount should be greater than 2"
    return msg[0]


# num1 then num2 then operation (Simple Calc Function)
def simpleCalc(num1, op: str, num2):
    """
    [1] num + num
    [2] num - num
    [3] num * num or num x num
    [4] num / num
    [5] num ** num => 2 ** 3 = 8
    [6] num // num => 110 // 50 = 2
    [7] num % num => 10 % 2 = 0
    [8] num -- num => 2 - -2 = 4
    """
    if op:
        if op == "+":
            return num1 + num2
        elif op == "-":
            return num1 - num2
        elif op == "*" or op == "x":
            return num1 * num2
        elif op == "/":
            return num1 / num2
        elif op == "**":
            return num1**num2
        elif op == "//":
            return num1 // num2
        elif op == "%":
            return num1 % num2
        elif op == "--":
            return num1 - -num2
        else:
            return "Operation Is Not Valid"
    else:
        print("You must write your opration value in function")


# addtion function
def addition(*nums):
    sum = 0
    for num in nums:
        sum += num
    return sum


# About Time
def setInterval(doFunction, duration):
    while True:
        doFunction()
        time.sleep(duration / 1000)


def setTimeout(doFunction, duration):
    time.sleep(duration / 1000)
    doFunction()


# Creating random number and if this random num = your random num , you're winner
def checkPrice(rNum, range_start, range_end):
    # it returns a price number
    priceNum = getR_Num(simpleCalc(range_start, "+", range_end))
    if rNum == priceNum:
        print(f"Congratulations! You are winner {rNum} = {priceNum}")
    else:
        print(f"Sorry Your number {rNum} not in list of prices number")


# exit function if user open It from python.exe
def exit(exitValue):
    exit = input(f'Enter "{exitValue}" to exit\n')
    while exit != exitValue:
        exit = input(f'Enter "{exitValue}" to exit\n')
        continue


# Let's know about api in python
# url = "https://api.npoint.io/624c71eaa4bb8ac0bc70"
msg = None


def getApi(url):
    response = requests.get(url)
    if response.status_code == 200:
        msg = f"JSON: {(response.json())}"
    else:
        msg = f"Error {response.status_code}"
    return msg


# Check Even number
def checkEvenAnOdd(num):
    """return a string `even` `odd`"""
    if num % 2 == 0:
        return "even"
    else:
        return "odd"


# Add Probery to obj
def addPropToObj(key, value, d={}):
    d[key] = value
    print(d)


# sum all digits that Next to each other
def sumdigits(inp):
    """sum all digits that Next to each other 123 => 6"""
    sum = 0
    for num in inp:
        num = int(num)
        sum += num
    return sum


# Acess list methods in list
def liMethods(
    li: list,
    is_clear: bool,
    itemtoapp,
    prependItem,
    itemtore,
    extendToli: list,
    is_sort=False,
    is_sort_reverse=False,
    is_reverse=False,
    is_join=False,
):
    if is_clear is True:
        li.clear()
    if type(itemtoapp) == list:
        for item in itemtoapp:
            li.append(item)
    elif itemtoapp != None:
        li.append(itemtoapp)
    if itemtore != None:
        li.remove(itemtore)
    if prependItem != None:
        li.insert(0, prependItem)
    if is_sort == True:
        li.sort()
    if is_sort_reverse == True:
        li.sort(reverse=True)
    if is_reverse is True:
        li.reverse()
    if extendToli != None:
        li.extend(extendToli)
    if is_join == True:
        li = " ".join(li)

    return li


# extend Lists
def extendLists(li1: list, *lis: list):
    for li in lis:
        li1.extend(li)
    return li1


# OOP
class Member:
    def __init__(self, firstName, lastName, age, gender):
        self.fname = firstName
        self.lname = lastName
        self.age = age
        self.gen = gender

    def memberData(self):
        return (
            f"Full name: {self.fname} {self.lname}\nAge: {self.age}\nGender: {self.gen}"
        )
