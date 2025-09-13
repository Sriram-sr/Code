package Quizconsole;

public class QuestionService {
    Question[] questions = new Question[3];

    public void createQuestions() {
        questions[0] = new Question(1, "What do you really need?", "Peace", "Code", "Music", "Cricket", "Code");
        questions[1] = new Question(2, "Which one do you like the most", "Peace", "Code", "Music", "Cricket", "Code");
        questions[2] = new Question(3, "What's your next priority", "Peace", "Code", "Music", "Cricket", "Music");
    }

    public void displayQuestions() {
        for (Question question: questions) {
            System.out.println(question.getQuestion());
        }
    }
}