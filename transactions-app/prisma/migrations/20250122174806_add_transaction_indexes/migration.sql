-- CreateIndex
CREATE INDEX "Transaction_fromAccountId_idx" ON "Transaction"("fromAccountId");

-- CreateIndex
CREATE INDEX "Transaction_toAccountId_idx" ON "Transaction"("toAccountId");
