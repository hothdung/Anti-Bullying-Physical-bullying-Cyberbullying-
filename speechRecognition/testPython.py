import sys
import json


def read_in():
    lines = sys.stdin.readlines()

    return json.loads(lines[0])


def main():
    testStr = read_in()
    print testStr


if __name__ == '__main__':
    main = main()
