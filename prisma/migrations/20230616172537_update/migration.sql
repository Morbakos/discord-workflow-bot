/*
  Warnings:

  - You are about to alter the column `executor` on the `taskexecutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- DropIndex
DROP INDEX `WorkflowTasks_idTaskExecutor_fkey` ON `workflowtasks`;

-- DropIndex
DROP INDEX `WorkflowTasks_idWorkflowContext_fkey` ON `workflowtasks`;

-- AlterTable
ALTER TABLE `taskexecutor` MODIFY `executor` ENUM('create_channel') NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idWorkflowContext_fkey` FOREIGN KEY (`idWorkflowContext`) REFERENCES `WorkflowContext`(`idWorkflowContext`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idTaskExecutor_fkey` FOREIGN KEY (`idTaskExecutor`) REFERENCES `TaskExecutor`(`idTaskExecutor`) ON DELETE RESTRICT ON UPDATE CASCADE;
