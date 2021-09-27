import { Badge } from "./badges_model";

export async function getBadge(id: number): Promise<Badge> {
  const badge = await Badge.findOne({ where: { badgeId: id } });
  if (badge == null) throw Error("Badge not found");
  return badge;
}

export async function createBadge(
  badgeName: string,
  dateEarned: Date,
  notes: string | null
): Promise<Badge> {
  console.log(Badge.sequelize);
  console.log(badgeName, dateEarned, notes);
  return Badge.create({
    badgeName,
    dateEarned,
    notes,
  });
}

export async function getAllStudents(): Promise<Badge[]> {
  const students = await Badge.findAll();
  return students;
}
