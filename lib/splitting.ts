// TODO: Split algorithms — equal, percentage, exact, shares. Must sum to the total with no rounding drift.
import type { Split,SplitType } from "@/types";

function distribute(
    amountCents:number,
    weights: {
        memberId : string;
        weight : number;      
    }[],
):Split[]{
    const totalWeight = weights.reduce((sum,w) => sum + w.weight,0);
    if(totalWeight <= 0){
        throw new Error("Split weights must add up to more than zero");
    }

    const exact = weights.map((w) => (amountCents * w.weight) / totalWeight);
    const splits = weights.map((w,i) => ({
        memberId: w.memberId,
        amountCents: Math.floor(exact[i]),
    }));

    // Never more leftover cents than entries, since each floor loses under 1.
    let leftover = amountCents - splits.reduce((sum, s) => sum + s.amountCents, 0);

    const byRemainder = exact
        .map((value, i) => ({ i, frac: value - Math.floor(value) }))
        .sort((a, b) => b.frac - a.frac || a.i - b.i); // stable tie-break

        for (let k = 0; leftover > 0; k++, leftover--) {
        splits[byRemainder[k].i].amountCents += 1;
    }

    return splits;
}

export function splitEqual(amountCents: number, memberIds: string[]): Split[] {
  return distribute(
    amountCents,
    memberIds.map((memberId) => ({ memberId, weight: 1 })),
  );
}

export function splitByShares(
  amountCents: number,
  shares: Record<string, number>,
): Split[] {
  return distribute(
    amountCents,
    Object.entries(shares).map(([memberId, weight]) => ({ memberId, weight })),
  );
}

export function splitByPercentage(
  amountCents: number,
  percentages: Record<string, number>,
): Split[] {
  const total = Object.values(percentages).reduce((sum, p) => sum + p, 0);
  if (Math.abs(total - 100) > 0.001) {
    throw new Error(`Percentages must add up to 100, got ${total}`);
  }
  return distribute(
    amountCents,
    Object.entries(percentages).map(([memberId, weight]) => ({
      memberId,
      weight,
    })),
  );
}

export function splitExact(
  amountCents: number,
  amounts: Record<string, number>,
): Split[] {
  const splits = Object.entries(amounts).map(([memberId, cents]) => ({
    memberId,
    amountCents: cents,
  }));

  const total = splits.reduce((sum, s) => sum + s.amountCents, 0);
  if (total !== amountCents) {
    throw new Error(
      `Splits total ${total} but the expense is ${amountCents}`,
    );
  }
  return splits;
}

export function splitRemainder(amountCents: number, splits: Split[]): number {
  return amountCents - splits.reduce((sum, s) => sum + s.amountCents, 0);
}

export function describeSplit(type: SplitType, memberCount: number): string {
  return type === "equal" ? `Split ${memberCount} ways` : "Custom split";
}