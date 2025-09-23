export default function LoadingProductDetail() {
  return (
    <div className="pb-24">
      <div className="px-4 py-10">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8 items-center">
          <div className="h-4 w-48 rounded bg-muted animate-pulse" />

          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl w-full">
            <div className="relative aspect-[16/9] w-full bg-muted animate-pulse" />

            <div className="p-6 md:p-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-6 w-24 rounded bg-muted animate-pulse" />
                  <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
                  <div className="flex items-baseline justify-between rounded-xl border border-border/60 bg-background/60 p-4">
                    <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                      <div className="h-6 w-24 rounded bg-muted animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-muted/80 animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-muted/80 animate-pulse" />
                  </div>
                </div>

                <section className="space-y-6">
                  <div className="space-y-3">
                    <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted/80 animate-pulse" />
                      <div className="h-4 w-11/12 rounded bg-muted/80 animate-pulse" />
                      <div className="h-4 w-10/12 rounded bg-muted/80 animate-pulse" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4 space-y-3">
                    <div className="h-5 w-44 rounded bg-muted animate-pulse" />
                    <ul className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 h-4 w-4 rounded bg-muted animate-pulse" />
                          <div className="h-4 w-5/6 rounded bg-muted/80 animate-pulse" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="h-6 w-32 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-48 rounded bg-muted/80 animate-pulse" />
                    </div>
                    <div className="w-full">
                      <div className="h-40 w-full rounded-xl bg-muted animate-pulse" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 px-4 bg-white dark:bg-background/95">
        <div className="mx-auto flex max-w-lg justify-center py-4">
          <div className="w-full max-w-lg p-1 space-y-2">
            <div className="h-3 w-40 mx-auto rounded bg-muted/80 animate-pulse" />
            <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

