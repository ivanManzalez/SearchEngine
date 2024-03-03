#HOW TO RUN

***Must run from SearchEngine/src file***

###### cmd line ######
----------------------
- run both commands after any change
- run java command after javac

indexEngine{
```Java
  javac component/IndexEngine/IndexEngine.java
  java component/IndexEngine/IndexEngine <pathTo/src/file> <pathTo/output/file>
```
}

DocFinder{
```Java
  javac component/DocFinder/DocFinder.java
  java component/DocFinder/DocFinder <pathTo/output/file> <DOCNO> <file>
```
}

###### make #######
----------------------
- run make to create run targets or to update
- run make run-* to run any command afterwards

```Bash
make 
make run-IndexEngine
make run-DocFinder ARG1=<"id"/"docno"> ARG2=<id/docNo>
make run-QC 
make run-IndexEngineStemmed
```