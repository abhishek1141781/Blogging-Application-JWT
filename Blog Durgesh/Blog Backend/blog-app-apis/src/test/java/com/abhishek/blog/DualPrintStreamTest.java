//package com.abhishek.blog;
//
//import static org.junit.jupiter.api.Assertions.assertLinesMatch;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//import java.io.IOException;
//import java.io.OutputStream;
//import java.io.PrintStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.util.Arrays;
//import java.util.List;
//
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.io.TempDir;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.abhishek.blog.logging.DualPrintStream;
//
//@SpringBootTest
//class DualPrintStreamTest {
//
//    private static final List<String> OUTPUT_LINES = Arrays.asList("Line 1", "Line 2", "Line 3");
//
//    @Test
//    void whenUsingDualPrintStream_thenOutputsGoToConsoleAndFile(@TempDir Path tempDir) throws IOException {
//        PrintStream originalOut = System.out;
//        Path outputFilePath = tempDir.resolve("dual-output.txt");
//
//        try (OutputStream fileOutputStream = Files.newOutputStream(outputFilePath);
//             DualPrintStream dualOut = new DualPrintStream(fileOutputStream, originalOut)) {
//            System.setOut(dualOut);
//            OUTPUT_LINES.forEach(line -> System.out.println(line));
//        }
//
//        assertTrue(outputFilePath.toFile().exists(), "The file exists");
//        assertLinesMatch(OUTPUT_LINES, Files.readAllLines(outputFilePath));
//        System.setOut(originalOut);
//    }
//}
