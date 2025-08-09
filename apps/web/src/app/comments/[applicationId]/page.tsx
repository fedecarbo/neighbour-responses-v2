import { TabNavigation } from "@/components/layout/TabNavigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilterStateLoader } from "@/components/layout/FilterStateLoader"
import { CommentsSection } from "@/components/comments/CommentsSection"

interface CommentsPageProps {
  params: Promise<{
    applicationId: string
  }>
  searchParams: Promise<{
    search?: string
    sentiment?: string
    status?: string
  }>
}

export default async function CommentsPage({ params, searchParams }: CommentsPageProps) {
  const { applicationId } = await params
  const searchParamsData = await searchParams

  return (
    <>
      <FilterStateLoader searchParams={searchParamsData} />
      <TabNavigation applicationId={applicationId} activeTab="comments">
      <div className="space-y-6">
        {/* Filter Controls Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Filter Controls</CardTitle>
              <CardDescription>
                This feature will help you refine the displayed comments based on sentiment, location, and other criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm">All Sentiments</Button>
                <Button variant="outline" size="sm">Positive</Button>
                <Button variant="outline" size="sm">Neutral</Button>
                <Button variant="outline" size="sm">Negative</Button>
                <Button variant="outline" size="sm">Geographic Filter</Button>
                <Button variant="outline" size="sm">Date Range</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Map Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>
                This feature will help you visualize comment locations and analyze spatial patterns of community feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[450px] flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md">
                <div className="text-center">
                  <p className="font-medium text-gray-500 mb-2">Interactive Map View</p>
                  <p className="text-sm text-gray-400">
                    • Color-coded pins by sentiment<br/>
                    • Synchronized selection with comment list<br/>
                    • Clustering for high-density areas<br/>
                    • Geographic filtering tools
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Comments List Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Comments List (5 comments)</CardTitle>
              <CardDescription>
                Browse, analyze, and manage individual neighbor responses with synchronized map highlighting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommentsSection />
            </CardContent>
          </Card>
        </section>
      </div>
      </TabNavigation>
    </>
  )
}