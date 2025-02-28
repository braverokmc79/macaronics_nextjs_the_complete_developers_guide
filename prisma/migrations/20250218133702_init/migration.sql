-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "companyName" TEXT,
    "numberOfEmployees" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
