import { TabNavigation } from "@/components/layout/TabNavigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterStateLoader } from "@/components/layout/FilterStateLoader"
import { getDashboardData } from "@/lib/dashboardAnalytics"

interface DashboardPageProps {
  params: Promise<{
    applicationId: string
  }>
  searchParams: Promise<{
    search?: string
    sentiment?: string
    status?: string
  }>
}

export default async function DashboardPage({ params, searchParams }: DashboardPageProps) {
  const { applicationId } = await params
  const searchParamsData = await searchParams
  const { sentimentCounts, tagAnalysis, commonConcerns } = getDashboardData()
  
  const getTagColor = (tag: string): string => {
    const colors = {
      'Use': 'bg-blue-100 text-blue-800',
      'Privacy': 'bg-purple-100 text-purple-800',
      'Light': 'bg-yellow-100 text-yellow-800',
      'Access': 'bg-orange-100 text-orange-800',
      'Noise': 'bg-red-100 text-red-800',
      'Traffic': 'bg-indigo-100 text-indigo-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[tag as keyof typeof colors] || colors['Other']
  }
  
  return (
    <>
      <FilterStateLoader searchParams={searchParamsData} />
      <TabNavigation applicationId={applicationId} activeTab="dashboard">
      <div className="space-y-6">
        {/* Analytics Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Application Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sentimentCounts.total}</div>
                <p className="text-xs text-muted-foreground">
                  Total neighbor responses received
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Positive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{sentimentCounts.positive}</div>
                <p className="text-xs text-muted-foreground">
                  Positive community responses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Neutral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{sentimentCounts.neutral}</div>
                <p className="text-xs text-muted-foreground">
                  Neutral community responses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Objected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{sentimentCounts.negative}</div>
                <p className="text-xs text-muted-foreground">
                  Negative community responses
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Insights Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-6">
                The community feedback reveals mixed sentiments about the proposed development. While one positive response highlights appreciation for green spaces and accessibility features, the majority of concerns focus on privacy issues from building height, potential traffic increases, noise during construction and occupancy, and questions about architectural compatibility with the existing neighborhood character. Additional concerns include lighting adequacy for safety and broader environmental impacts. These objections primarily center around quality of life impacts and neighborhood integration.
              </p>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Most Objected Topics</p>
                <div className="flex flex-wrap gap-2">
                  {tagAnalysis.slice(0, 6).map((tag) => (
                    <Badge key={tag.tag} className={getTagColor(tag.tag)}>
                      {tag.tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Analytics Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Detailed Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>
                  This feature will help you visualize sentiment patterns across different time periods and geographic areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Interactive sentiment chart visualization</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographic Heatmap</CardTitle>
                <CardDescription>
                  This feature will help you identify geographic clusters of comment activity and sentiment patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Spatial analysis heatmap</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      </TabNavigation>
    </>
  )
}