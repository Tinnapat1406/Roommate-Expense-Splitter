// TODO: Recurring — manage repeating charges (schedule, amount, split rule).
import { ForecastCard } from "@/components/forecast/ForecastCard";
import { ForecastTimeline } from "@/components/forecast/ForecastTimeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { RECURRENCE_INTERVALS } from "@/lib/constants";
import { RECURRING_RULES } from "@/lib/mock-data";
import { forecast } from "@/lib/recurring";
import { formatCurrency } from "@/lib/utils";

