import sys

file1 = open("testFile.txt", "w");
file1.write(sys.argv[0])
file1.close()

#This program should write something to testFile.txt
#This should help debug whether or not we are using php get action correctly!
