-- CreateTable
CREATE TABLE `WorkflowContext` (
    `idWorkflowContext` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` VARCHAR(191) NOT NULL,
    `idDiscordEvent` ENUM('MESSAGE_CREATED', 'MEMBER_JOINED') NOT NULL,

    PRIMARY KEY (`idWorkflowContext`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkflowTasks` (
    `idWorkflowTask` INTEGER NOT NULL AUTO_INCREMENT,
    `idWorkflowContext` INTEGER NOT NULL,
    `idTaskExecutor` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`idWorkflowTask`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskExecutor` (
    `idTaskExecutor` INTEGER NOT NULL AUTO_INCREMENT,
    `executor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTaskExecutor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idWorkflowContext_fkey` FOREIGN KEY (`idWorkflowContext`) REFERENCES `WorkflowContext`(`idWorkflowContext`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkflowTasks` ADD CONSTRAINT `WorkflowTasks_idTaskExecutor_fkey` FOREIGN KEY (`idTaskExecutor`) REFERENCES `TaskExecutor`(`idTaskExecutor`) ON DELETE RESTRICT ON UPDATE CASCADE;
