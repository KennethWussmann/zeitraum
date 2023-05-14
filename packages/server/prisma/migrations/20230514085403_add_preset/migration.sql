-- CreateTable
CREATE TABLE "Preset" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Preset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnPresets" (
    "presetId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TagsOnPresets_pkey" PRIMARY KEY ("presetId","tagId")
);

-- AddForeignKey
ALTER TABLE "Preset" ADD CONSTRAINT "Preset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPresets" ADD CONSTRAINT "TagsOnPresets_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "Preset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPresets" ADD CONSTRAINT "TagsOnPresets_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPresets" ADD CONSTRAINT "TagsOnPresets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
