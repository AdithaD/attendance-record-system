import { Badge } from "@/backend/badges/badge_model";
import { Test } from "@/backend/badges/test_model";
import router from "@/router";

export function openTest(test: Test): void {
  router.push({
    name: "ViewTest",
    params: { id: test.get("testId") as number },
  });
}

export function openBadge(badge: Badge): void {
  router.push({
    name: "ViewBadge",
    params: { id: badge.get("badgeId") as number },
  });
}
