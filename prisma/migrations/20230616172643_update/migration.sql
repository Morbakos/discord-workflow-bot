-- DropIndex
DROP INDEX `WorkflowTasks_idTaskExecutor_fkey` ON `workflowtasks`;

-- DropIndex
DROP INDEX `WorkflowTasks_idWorkflowContext_fkey` ON `workflowtasks`;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idWorkflowContext_fkey` FOREIGN KEY (`idWorkflowContext`) REFERENCES `WorkflowContext`(`idWorkflowContext`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idTaskExecutor_fkey` FOREIGN KEY (`idTaskExecutor`) REFERENCES `TaskExecutor`(`idTaskExecutor`) ON DELETE RESTRICT ON UPDATE CASCADE;
