package Quizconsole;

public class Main {
    public static void main(String[] args) {
        QuestionService service = new QuestionService();
        service.createQuestions();
        service.displayQuestions();
    }
}