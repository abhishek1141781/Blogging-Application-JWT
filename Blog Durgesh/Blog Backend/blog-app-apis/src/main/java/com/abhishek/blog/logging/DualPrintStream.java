//package com.abhishek.blog.logging;
//
//import java.io.OutputStream;
//import java.io.PrintStream;
//
//public class DualPrintStream extends PrintStream {
//    private PrintStream consoleOutput;
//
//    public DualPrintStream(OutputStream fileOutput, PrintStream consoleOutput) {
//        super(fileOutput);
//        this.consoleOutput = consoleOutput;
//    }
//
//    @Override
//    public void write(byte[] buf, int off, int len) {
//        super.write(buf, off, len); // Write to the file
//        consoleOutput.write(buf, off, len); // Write to the console
//    }
//
//    @Override
//    public void write(int b) {
//        super.write(b); // Write to the file
//        consoleOutput.write(b); // Write to the console
//    }
//
//    @Override
//    public void close() {
//        super.close();
//        consoleOutput.close();
//    }
//}
