package OOP;

class Database {
    private String hostname;
    private String password;

    Database(String uname, String pwd) {
        this.hostname = uname;
        this.password = pwd;
    }

    public String getHostname() {
        return this.hostname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String pwd) throws Exception {
        if (this.password.equals(pwd)) {
            throw new Exception("New password cannot be same as old password");
        }
        this.password = pwd;
    }
}

public class GetterSetter {
    public static void main(String[] args) throws Exception {
        Database dbclient = new Database("cisco", "cisco123");
        System.out.println(dbclient.getHostname());
        dbclient.setPassword("Cisco2020!");
        System.out.println(dbclient.getPassword());
    }
}
