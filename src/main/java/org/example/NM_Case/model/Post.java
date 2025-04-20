package org.example.NM_Case.model;

public class Post {
    private String author;
    private String content;
    private long time;
    private boolean seen;

    public Post() {}
    public Post(String author, String content, long time, boolean seen) {
        this.author = author;
        this.content = content;
        this.time = time;
        this.seen = seen;
    }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public long getTime() { return time; }

    public boolean getSeen() { return seen; }
    public void setSeen(boolean seen) { this.seen = seen; }
}