#include <iostream>
#include <sqlite3.h>

int main() {
	sqlite3* db;
	int fd = sqlite3_open("mydb.db", &db);

	if (fd == SQLITE_OK) {
		std::cout << "Success opening the database.\n";
	}
	else {
		std::cerr << "Error:\n";
		std::cerr << sqlite3_errmsg(db) << '\n';
		exit(1);
	}

	sqlite3_close(db);
}